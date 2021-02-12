import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as dotenv from 'dotenv';

dotenv.config();

export class DudaInstantSiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { API_USER = '', API_PASS = '', API_BASE = '' } = process.env;
    const getSites = new lambda.Function(this, 'GetSitesLambda', {
      code: lambda.Code.fromAsset('lambda/getSites'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_12_X,
      environment: {
        API_USER,
        API_PASS,
        API_BASE
      }
    });

    const api = new apiGateway.LambdaRestApi(this, 'duda', {
      handler: getSites,
      proxy: false
    });

    api.root.addMethod('ANY');

    const sites = api.root.addResource('sites');
    sites.addMethod('GET', new apiGateway.LambdaIntegration(getSites));
  }
}
