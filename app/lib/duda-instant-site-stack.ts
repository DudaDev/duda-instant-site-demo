import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as dotenv from 'dotenv';
import { Function, FunctionProps, LayerVersion } from '@aws-cdk/aws-lambda';
import { IResource, LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { SPADeploy } from 'cdk-spa-deploy';
import routes from './routes';

dotenv.config();

const verbs = ['GET','POST','PUT','PATCH','DELETE'];
const environment = (
  ({ API_USER = '', API_PASS = '', API_BASE = '' }) => ({ API_USER, API_PASS, API_BASE })
)(process.env);

export class DudaInstantSiteStack extends cdk.Stack {
  private layer: LayerVersion;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.layer = this.createLayer();
    this.createAPI(routes);

    // // @ts-ignore
    new SPADeploy(this, 'spaDeploy')
      .createSiteWithCloudfront({
        indexDoc: 'index.html',
        websiteFolder: `${__dirname}/../frontend/build` 
      });

  }

  private createResources(resource: IResource, obj: object): IResource {
    for (const [key, value] of Object.entries(obj)) {
      verbs.includes(key.toUpperCase())
        ? resource.addMethod(key, new apiGateway.LambdaIntegration(this.createLambda(key.toUpperCase(),value)))
        : this.createResources(resource.addResource(key), value);
    }

    return resource;
  }

  private createAPI(routes: object): LambdaRestApi {
    const api = new apiGateway.LambdaRestApi(this, 'duda', {
      handler: this.createLambda('ANY','root'),
      proxy: false
    });

    api.root.addMethod('ANY');
    this.createResources(api.root, routes);
    return api;
  }

  private createLambda(verb: string, dir: string): Function {
    return new lambda.Function(this, `${verb}-${dir}-Lambda`, this.getLambdaConfig(`lambdas/${verb=="OPTIONS"?'root':dir}`));
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
