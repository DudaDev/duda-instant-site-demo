import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as apiGateway from '@aws-cdk/aws-apigateway'
import * as dotenv from 'dotenv';

dotenv.config();

export class DudaInstantSiteStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const { API_USER = '', API_PASS = '', API_BASE = '' } = process.env;
    const environment = {
       API_USER,
       API_PASS,
       API_BASE
    }

    const createSite = new lambda.Function(this, 'CreateSiteLambda', {
      code: lambda.Code.fromAsset('lambda/createSite'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const createUser = new lambda.Function(this, 'CreateUserLambda', {
      code: lambda.Code.fromAsset('lambda/createUser'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const deleteSite = new lambda.Function(this, 'DeleteSiteLambda', {
      code: lambda.Code.fromAsset('lambda/deleteSite'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const deleteSites = new lambda.Function(this, 'DeleteSitesLambda', {
      code: lambda.Code.fromAsset('lambda/deleteSites'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const getSites = new lambda.Function(this, 'GetSitesLambda', {
      code: lambda.Code.fromAsset('lambda/getSites'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const getSSOLink = new lambda.Function(this, 'GetSSOLinkLambda', {
      code: lambda.Code.fromAsset('lambda/getSSOLink'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const grantUserAccess = new lambda.Function(this, 'GrantUserAccessLambda', {
      code: lambda.Code.fromAsset('lambda/grantUserAccess'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const publishSite = new lambda.Function(this, 'PublishSiteLambda', {
      code: lambda.Code.fromAsset('lambda/publishSite'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const updateContent = new lambda.Function(this, 'UpdateContentLambda', {
      code: lambda.Code.fromAsset('lambda/updateContent'),
      handler: 'index.handler',
      runtime: lambda.Runtime.NODEJS_14_X,
      environment: environment
    });

    const api = new apiGateway.LambdaRestApi(this, 'duda', {
      handler: getSites,
      proxy: false
    });

    api.root.addMethod('ANY');

    const sites = api.root.addResource('sites');
    const siteName = sites.addResource('{siteName}');
    const siteContent = siteName.addResource('content');

    sites.addMethod('POST', new apiGateway.LambdaIntegration(createSite));
    sites.addMethod('DELETE', new apiGateway.LambdaIntegration(deleteSites));
    sites.addMethod('GET', new apiGateway.LambdaIntegration(getSites));

    siteName.addMethod('PUT', new apiGateway.LambdaIntegration(publishSite));
    siteName.addMethod('DELETE', new apiGateway.LambdaIntegration(deleteSite));

    siteContent.addMethod('PATCH', new apiGateway.LambdaIntegration(updateContent));
    siteContent.addMethod('POST', new apiGateway.LambdaIntegration(updateContent));

    const users = api.root.addResource('users');
    const userId = users.addResource('{userId}');
    const provision = userId.addResource('provision');

    userId.addMethod('GET', new apiGateway.LambdaIntegration(getSSOLink));
    userId.addMethod('POST', new apiGateway.LambdaIntegration(createUser));

    provision.addMethod('POST', new apiGateway.LambdaIntegration(grantUserAccess));

  }
}
