"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DudaInstantSiteStack = void 0;
const cdk = require("@aws-cdk/core");
const lambda = require("@aws-cdk/aws-lambda");
const apiGateway = require("@aws-cdk/aws-apigateway");
const dotenv = require("dotenv");
const cdk_spa_deploy_1 = require("cdk-spa-deploy");
const routes_1 = require("./routes");
dotenv.config();
const verbs = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];
const environment = (({ API_USER = '', API_PASS = '', API_BASE = '' }) => ({ API_USER, API_PASS, API_BASE }))(process.env);
class DudaInstantSiteStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.layer = this.createLayer();
        this.createAPI(routes_1.default);
        // @ts-ignore
        new cdk_spa_deploy_1.SPADeploy(this, 'cfDeploy')
            .createSiteWithCloudfront({
            indexDoc: 'index.html',
            websiteFolder: '../frontend/build'
        });
    }
    createResources(resource, obj) {
        for (const [key, value] of Object.entries(obj)) {
            key.toUpperCase() == "OPTIONS"
                ? resource.addMethod(key, new apiGateway.LambdaIntegration(this.createOptionsHandler(key.toUpperCase(), value)))
                : verbs.includes(key.toUpperCase())
                    ? resource.addMethod(key, new apiGateway.LambdaIntegration(this.createLambda(key.toUpperCase(), value)))
                    : this.createResources(resource.addResource(key), value);
        }
        return resource;
    }
    createAPI(routes) {
        const api = new apiGateway.LambdaRestApi(this, 'duda', {
            handler: this.createLambda('ANY', 'root'),
            proxy: false
        });
        api.root.addMethod('ANY');
        this.createResources(api.root, routes);
        return api;
    }
    createLambda(verb, dir) {
        return new lambda.Function(this, `${verb}-${dir}-Lambda`, this.getLambdaConfig(`lambdas/${dir}`));
    }
    createOptionsHandler(verb, dir) {
        return new lambda.Function(this, `${verb}-${dir}-Lambda`, this.getLambdaConfig(`lambdas/root`));
    }
    getLambdaConfig(path) {
        return {
            code: lambda.Code.fromAsset(path),
            handler: 'index.handler',
            runtime: lambda.Runtime.NODEJS_14_X,
            timeout: cdk.Duration.seconds(20),
            environment,
            layers: [this.layer]
        };
    }
    createLayer() {
        return new lambda.LayerVersion(this, 'lambda-layer', {
            code: lambda.Code.fromAsset('layers'),
            compatibleRuntimes: [lambda.Runtime.NODEJS_14_X],
        });
    }
}
exports.DudaInstantSiteStack = DudaInstantSiteStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHVkYS1pbnN0YW50LXNpdGUtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkdWRhLWluc3RhbnQtc2l0ZS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxQ0FBcUM7QUFDckMsOENBQThDO0FBQzlDLHNEQUFxRDtBQUNyRCxpQ0FBaUM7QUFHakMsbURBQTJDO0FBQzNDLHFDQUE4QjtBQUU5QixNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFaEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxPQUFPLEVBQUMsUUFBUSxDQUFDLENBQUM7QUFDcEQsTUFBTSxXQUFXLEdBQUcsQ0FDbEIsQ0FBQyxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQ3hGLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBRWYsTUFBYSxvQkFBcUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUdqRCxZQUFZLEtBQW9CLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQ2xFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQU0sQ0FBQyxDQUFDO1FBRXZCLGFBQWE7UUFDYixJQUFJLDBCQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQzthQUM1Qix3QkFBd0IsQ0FBQztZQUN4QixRQUFRLEVBQUUsWUFBWTtZQUN0QixhQUFhLEVBQUUsbUJBQW1CO1NBQ25DLENBQUMsQ0FBQztJQUVQLENBQUM7SUFFTyxlQUFlLENBQUMsUUFBbUIsRUFBRSxHQUFXO1FBQ3RELEtBQUssTUFBTSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzlDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxTQUFTO2dCQUM1QixDQUFDLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxVQUFVLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUMvRyxDQUFDLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7b0JBQ2pDLENBQUMsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxJQUFJLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsRUFBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUN2RyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQzlEO1FBRUQsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQztJQUVPLFNBQVMsQ0FBQyxNQUFjO1FBQzlCLE1BQU0sR0FBRyxHQUFHLElBQUksVUFBVSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFFO1lBQ3JELE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBQyxNQUFNLENBQUM7WUFDeEMsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkMsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU8sWUFBWSxDQUFDLElBQVksRUFBRSxHQUFXO1FBQzVDLE9BQU8sSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxHQUFHLElBQUksSUFBSSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BHLENBQUM7SUFFTyxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsR0FBVztRQUNwRCxPQUFPLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxJQUFJLElBQUksR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO0lBQ2xHLENBQUM7SUFFTyxlQUFlLENBQUMsSUFBWTtRQUNsQyxPQUFPO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUNqQyxPQUFPLEVBQUUsZUFBZTtZQUN4QixPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakMsV0FBVztZQUNYLE1BQU0sRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckIsQ0FBQTtJQUNILENBQUM7SUFFTyxXQUFXO1FBQ2pCLE9BQU8sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxjQUFjLEVBQUU7WUFDbkQsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxrQkFBa0IsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDO1NBQy9DLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQWxFRCxvREFrRUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnQGF3cy1jZGsvY29yZSc7XG5pbXBvcnQgKiBhcyBsYW1iZGEgZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgKiBhcyBhcGlHYXRld2F5IGZyb20gJ0Bhd3MtY2RrL2F3cy1hcGlnYXRld2F5J1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgeyBGdW5jdGlvbiwgRnVuY3Rpb25Qcm9wcywgTGF5ZXJWZXJzaW9uIH0gZnJvbSAnQGF3cy1jZGsvYXdzLWxhbWJkYSc7XG5pbXBvcnQgeyBJUmVzb3VyY2UsIExhbWJkYVJlc3RBcGkgfSBmcm9tICdAYXdzLWNkay9hd3MtYXBpZ2F0ZXdheSc7XG5pbXBvcnQgeyBTUEFEZXBsb3kgfSBmcm9tICdjZGstc3BhLWRlcGxveSc7XG5pbXBvcnQgcm91dGVzIGZyb20gJy4vcm91dGVzJztcblxuZG90ZW52LmNvbmZpZygpO1xuXG5jb25zdCB2ZXJicyA9IFsnR0VUJywnUE9TVCcsJ1BVVCcsJ1BBVENIJywnREVMRVRFJ107XG5jb25zdCBlbnZpcm9ubWVudCA9IChcbiAgKHsgQVBJX1VTRVIgPSAnJywgQVBJX1BBU1MgPSAnJywgQVBJX0JBU0UgPSAnJyB9KSA9PiAoeyBBUElfVVNFUiwgQVBJX1BBU1MsIEFQSV9CQVNFIH0pXG4pKHByb2Nlc3MuZW52KTtcblxuZXhwb3J0IGNsYXNzIER1ZGFJbnN0YW50U2l0ZVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgcHJpdmF0ZSBsYXllcjogTGF5ZXJWZXJzaW9uO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICB0aGlzLmxheWVyID0gdGhpcy5jcmVhdGVMYXllcigpO1xuICAgIHRoaXMuY3JlYXRlQVBJKHJvdXRlcyk7XG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgbmV3IFNQQURlcGxveSh0aGlzLCAnY2ZEZXBsb3knKVxuICAgICAgLmNyZWF0ZVNpdGVXaXRoQ2xvdWRmcm9udCh7XG4gICAgICAgIGluZGV4RG9jOiAnaW5kZXguaHRtbCcsXG4gICAgICAgIHdlYnNpdGVGb2xkZXI6ICcuLi9mcm9udGVuZC9idWlsZCdcbiAgICAgIH0pO1xuXG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVJlc291cmNlcyhyZXNvdXJjZTogSVJlc291cmNlLCBvYmo6IG9iamVjdCk6IElSZXNvdXJjZSB7XG4gICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgT2JqZWN0LmVudHJpZXMob2JqKSkge1xuICAgICAga2V5LnRvVXBwZXJDYXNlKCkgPT0gXCJPUFRJT05TXCJcbiAgICAgICAgPyByZXNvdXJjZS5hZGRNZXRob2Qoa2V5LCBuZXcgYXBpR2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbih0aGlzLmNyZWF0ZU9wdGlvbnNIYW5kbGVyKGtleS50b1VwcGVyQ2FzZSgpLHZhbHVlKSkpXG4gICAgICAgIDogdmVyYnMuaW5jbHVkZXMoa2V5LnRvVXBwZXJDYXNlKCkpXG4gICAgICAgICAgPyByZXNvdXJjZS5hZGRNZXRob2Qoa2V5LCBuZXcgYXBpR2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbih0aGlzLmNyZWF0ZUxhbWJkYShrZXkudG9VcHBlckNhc2UoKSx2YWx1ZSkpKVxuICAgICAgICAgIDogdGhpcy5jcmVhdGVSZXNvdXJjZXMocmVzb3VyY2UuYWRkUmVzb3VyY2Uoa2V5KSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvdXJjZTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQVBJKHJvdXRlczogb2JqZWN0KTogTGFtYmRhUmVzdEFwaSB7XG4gICAgY29uc3QgYXBpID0gbmV3IGFwaUdhdGV3YXkuTGFtYmRhUmVzdEFwaSh0aGlzLCAnZHVkYScsIHtcbiAgICAgIGhhbmRsZXI6IHRoaXMuY3JlYXRlTGFtYmRhKCdBTlknLCdyb290JyksXG4gICAgICBwcm94eTogZmFsc2VcbiAgICB9KTtcblxuICAgIGFwaS5yb290LmFkZE1ldGhvZCgnQU5ZJyk7XG4gICAgdGhpcy5jcmVhdGVSZXNvdXJjZXMoYXBpLnJvb3QsIHJvdXRlcyk7XG4gICAgcmV0dXJuIGFwaTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTGFtYmRhKHZlcmI6IHN0cmluZywgZGlyOiBzdHJpbmcpOiBGdW5jdGlvbiB7XG4gICAgcmV0dXJuIG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgYCR7dmVyYn0tJHtkaXJ9LUxhbWJkYWAsIHRoaXMuZ2V0TGFtYmRhQ29uZmlnKGBsYW1iZGFzLyR7ZGlyfWApKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlT3B0aW9uc0hhbmRsZXIodmVyYjogc3RyaW5nLCBkaXI6IHN0cmluZyk6IEZ1bmN0aW9uIHtcbiAgICByZXR1cm4gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBgJHt2ZXJifS0ke2Rpcn0tTGFtYmRhYCwgdGhpcy5nZXRMYW1iZGFDb25maWcoYGxhbWJkYXMvcm9vdGApKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TGFtYmRhQ29uZmlnKHBhdGg6IHN0cmluZyk6IEZ1bmN0aW9uUHJvcHMge1xuICAgIHJldHVybiB7XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aCksXG4gICAgICBoYW5kbGVyOiAnaW5kZXguaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTRfWCxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDIwKSxcbiAgICAgIGVudmlyb25tZW50LFxuICAgICAgbGF5ZXJzOiBbdGhpcy5sYXllcl1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUxheWVyKCk6IExheWVyVmVyc2lvbiB7XG4gICAgcmV0dXJuIG5ldyBsYW1iZGEuTGF5ZXJWZXJzaW9uKHRoaXMsICdsYW1iZGEtbGF5ZXInLCB7XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xheWVycycpLFxuICAgICAgY29tcGF0aWJsZVJ1bnRpbWVzOiBbbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE0X1hdLFxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==