import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as s3 from '@aws-cdk/aws-s3';
import * as cf from '@aws-cdk/aws-cloudfront';
import * as apiGateway from '@aws-cdk/aws-apigateway';
import * as dotenv from 'dotenv';
import { Function, FunctionProps, LayerVersion } from '@aws-cdk/aws-lambda';
import { CorsOptions, IResource, LambdaRestApi, CfnAuthorizer, AuthorizationType } from '@aws-cdk/aws-apigateway';
import routes from './routes';
import * as pjson from '../package.json';
import { UserPool } from '@aws-cdk/aws-cognito';

dotenv.config();

const verbs = ['GET','POST','PUT','PATCH','DELETE'];
const environment = (
  ({ API_USER = '', API_PASS = '', API_BASE = '', WEBUI_USER = '', WEBUI_PASS = '', REGION='' }) => ({
      API_USER,
      API_PASS,
      API_BASE,
      WEBUI_USER,
      WEBUI_PASS,
      REGION,
      VERSION: pjson.version,
      NODE_PATH: '/opt/nodejs/lib/:/opt/nodejs/node_modules:$LAMBDA_RUNTIME_DIR/node_modules'
  })
)(process.env);

export class DudaInstantSiteStack extends cdk.Stack {

  private layer: LayerVersion;
  private s3bucket: s3.Bucket;
  private cloudfront: cf.CloudFrontWebDistribution;
  private api: LambdaRestApi;
  private authorizer: CfnAuthorizer;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.layer = this.createLayer();

    // S3 frontend bucket
    this.s3bucket = new s3.Bucket(this, "DudaInstantSiteFrontend", {
      publicReadAccess: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html"
    });

    // Cloudfront
    this.cloudfront = new cf.CloudFrontWebDistribution(this, "CDKCRAStaticDistribution", {
      originConfigs: [
        {
          s3OriginSource: {
            s3BucketSource: this.s3bucket
          },
          behaviors: [{isDefaultBehavior: true}]
        },
      ]
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


    this.api = this.createAPI(routes);

    this.authorizer = new CfnAuthorizer(this, 'cfnAuth', {
      restApiId: this.api.restApiId,
      name: 'InstantSiteAPIAuthorizer',
      type: 'COGNITO_USER_POOLS',
      identitySource: 'method.request.header.Authorization',
      providerArns: [userPool.userPoolArn],
    });

    this.createResources(this.api.root, routes);

    new cdk.CfnOutput(this, "apiBase", {
      value: this.api.url
    });

    new cdk.CfnOutput(this, "userPoolId", {
      value: userPool.userPoolId
    })

    new cdk.CfnOutput(this, "userPoolClientId", {
      value: userPoolClient.userPoolClientId
    });
    
    new cdk.CfnOutput(this, "userPoolRegion", {
      value: environment.REGION
    });

    new cdk.CfnOutput(this, "s3Bucket", {
      value: this.s3bucket.bucketName
    });

    new cdk.CfnOutput(this, "cfDistributionDomainName", {
      value: this.cloudfront.distributionDomainName
    });

    new cdk.CfnOutput(this, "cfDistributionId", {
      value: this.cloudfront.distributionId
    });

    new cdk.CfnOutput(this, "webUiUser", {
      value: environment.WEBUI_USER
    });

    new cdk.CfnOutput(this, "webUiPass", {
      value: environment.WEBUI_PASS
    });

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
      defaultCorsPreflightOptions: this.getCORS(this.cloudfront.distributionDomainName)
    });
    
    
    api.root.addMethod('ANY');
    return api;
  }

  private getCORS(domain: string): CorsOptions {
    return {
      allowOrigins: ["*"], // safe to pass tokenized cloudfront domain in this list 
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
