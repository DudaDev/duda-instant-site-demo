import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as dotenv from 'dotenv';
import { Function, FunctionProps, LayerVersion } from '@aws-cdk/aws-lambda';
import { CorsOptions, IResource, LambdaRestApi, CfnAuthorizer, AuthorizationType } from '@aws-cdk/aws-apigateway';
import { SPADeploy, SPADeployment, SPADeploymentWithCloudFront } from 'cdk-spa-deploy';
import routes from './routes';
import * as fs from 'fs';
import * as pjson from '../package.json';
import { UserPool, UserPoolClient, UserPoolClientIdentityProvider } from '@aws-cdk/aws-cognito';
import { isFunctionOrConstructorTypeNode, tokenToString } from 'typescript';
import { setFlagsFromString } from 'v8';

dotenv.config();

const verbs = ['GET','POST','PUT','PATCH','DELETE'];
const environment = (
  ({ API_USER = '', API_PASS = '', API_BASE = '' }) => ({
      API_USER,
      API_PASS,
      API_BASE,
      VERSION: pjson.version,
      NODE_PATH: '/opt/nodejs/lib/:/opt/nodejs/node_modules:$LAMBDA_RUNTIME_DIR/node_modules'
  })
)(process.env);

export class DudaInstantSiteStack extends cdk.Stack {

  private layer: LayerVersion;
  private frontend: SPADeploymentWithCloudFront;
  private api: LambdaRestApi;
  private authorizer: CfnAuthorizer;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.layer = this.createLayer();

    this.frontend = new SPADeploy(this, 'cfDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: '../frontend/build'
      });

    const userPool = new UserPool(this, 'Instant Sites User Pool', {
      signInAliases: {
        username: true
      },
      selfSignUpEnabled: false
    });

    const userPoolClient = userPool.addClient('Instant Sites User Pool Client', {
      authFlows: {
        userSrp: true
      },
      oAuth: {
        callbackUrls: ['http://localhost:3000'],
        logoutUrls: ['http://localhost:3000'],
        flows: {
          implicitCodeGrant: true
        }
      }
    })

    new cdk.CfnOutput(this, "userPoolId", {
      value: userPool.userPoolId
    })

    new cdk.CfnOutput(this, "userPoolClientId", {
      value: userPoolClient.userPoolClientId
    });

    this.api = this.createAPI(routes);

    this.authorizer = new CfnAuthorizer(this, 'cfnAuth', {
      restApiId: this.api.restApiId,
      name: 'InstantSiteAPIAuthorizer',
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [userPool.userPoolArn],
    });

    this.createResources(this.api.root, routes);
    // fs.writeFileSync('../frontend/.env',`API_BASE=${this.api.url}`);
  }

  private createResources(resource: IResource, obj: object): IResource {
    for (const [key, value] of Object.entries(obj)) {
      verbs.includes(key.toUpperCase())
          ? resource.addMethod(key, 
              new apiGateway.LambdaIntegration(this.createLambda(key.toUpperCase(),value)), 
              {
                authorizationType: AuthorizationType.COGNITO,
                authorizer: {
                  authorizerId: this.authorizer.ref
                }
              }
            )
          : this.createResources(resource.addResource(key), value);
    }

    return resource;
  }

  private createAPI(routes: object): LambdaRestApi {
    const api = new apiGateway.LambdaRestApi(this, 'duda', {
      handler: this.createLambda('ANY','root'),
      proxy: false,
      defaultCorsPreflightOptions: this.getCORS(this.frontend.distribution.distributionDomainName)
    });
    
    
    api.root.addMethod('ANY');
    return api;
  }

  private getCORS(domain: string): CorsOptions {
    return {
      allowOrigins: ["*"],
      allowMethods: ["OPTIONS","GET","PUT","POST","DELETE","PATCH"],
      allowHeaders: ["Content-Type",
                     "X-Amz-Date",
                     "Authorization",
                     "X-Api-Key",
                     "X-Amz-Security-Token",
                     "X-Amz-User-Agent"],
      allowCredentials: false
    }
  }

  private createLambda(verb: string, dir: string): Function {
    return new lambda.Function(this, `${verb}-${dir}-Lambda`, this.getLambdaConfig(`lambdas/${dir}`));
  }

  private getLambdaConfig(path: string): FunctionProps {
    return {
      code: lambda.Code.fromAsset(path),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      timeout: cdk.Duration.seconds(20),
      environment,
      layers: [this.layer]
    }
  }

  private createLayer(): LayerVersion {
    return new lambda.LayerVersion(this, 'lambda-layer', {
      code: lambda.Code.fromAsset('layers'),
      compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
      });
  }
}
