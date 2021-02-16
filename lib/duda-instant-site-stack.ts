import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as dotenv from 'dotenv';
import { Function, FunctionProps, LayerVersion } from '@aws-cdk/aws-lambda';
import { IResource, LambdaRestApi } from '@aws-cdk/aws-apigateway';
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
  }

  private createResources(resource: IResource, obj: object): IResource {
    for (const [key, value] of Object.entries(obj)) {
      verbs.includes(key.toUpperCase()) 
        ? resource.addMethod(key, new apiGateway.LambdaIntegration(this.createLambda(value)))
        : this.createResources(resource.addResource(key), value);
    }
   
    return resource;
  }

  private createAPI(routes: object): LambdaRestApi {
    const api = new apiGateway.LambdaRestApi(this, 'duda', {
      handler: this.createLambda('root'),
      proxy: false
    });

    api.root.addMethod('ANY');
    this.createResources(api.root, routes);
    return api;
  }

  private createLambda(dir: string): Function {
    return new lambda.Function(this, `${dir}Lambda`, this.getLambdaConfig(`lambdas/${dir}`));
  }

  private getLambdaConfig(path: string): FunctionProps {
    return {
      code: lambda.Code.fromAsset(path),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
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
