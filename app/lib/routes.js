"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "sites": {
        "POST": "createSite",
        "GET": "getSites",
        "{siteName}": {
            "PATCH": "updateContent",
            "PUT": "updateContent",
            "DELETE": "deleteSite",
            "versions": {
                "POST": "publishSite"
            }
        }
    },
    "users": {
        "POST": "createUser",
        "{userId}": {
            "accessFor": {
                "{siteName}": {
                    "POST": "grantUserAccess",
                    "GET": "getSSOLink"
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUcsVUFBVTtRQUNsQixZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsZUFBZTtZQUN4QixLQUFLLEVBQUUsZUFBZTtZQUN0QixRQUFRLEVBQUUsWUFBWTtZQUN0QixVQUFVLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLGFBQWE7YUFDeEI7U0FDRjtLQUNGO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsTUFBTSxFQUFFLFlBQVk7UUFDcEIsVUFBVSxFQUFFO1lBQ1YsV0FBVyxFQUFFO2dCQUNYLFlBQVksRUFBRTtvQkFDWixNQUFNLEVBQUUsaUJBQWlCO29CQUN6QixLQUFLLEVBQUUsWUFBWTtpQkFDcEI7YUFDRjtTQUNGO0tBQ0Y7Q0FDRixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQge1xuICBcInNpdGVzXCI6IHtcbiAgICBcIlBPU1RcIjogXCJjcmVhdGVTaXRlXCIsXG4gICAgXCJHRVRcIjogIFwiZ2V0U2l0ZXNcIixcbiAgICBcIntzaXRlTmFtZX1cIjoge1xuICAgICAgXCJQQVRDSFwiOiBcInVwZGF0ZUNvbnRlbnRcIixcbiAgICAgIFwiUFVUXCI6IFwidXBkYXRlQ29udGVudFwiLFxuICAgICAgXCJERUxFVEVcIjogXCJkZWxldGVTaXRlXCIsXG4gICAgICBcInZlcnNpb25zXCI6IHtcbiAgICAgICAgICBcIlBPU1RcIjogXCJwdWJsaXNoU2l0ZVwiXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcInVzZXJzXCI6IHtcbiAgICBcIlBPU1RcIjogXCJjcmVhdGVVc2VyXCIsXG4gICAgXCJ7dXNlcklkfVwiOiB7XG4gICAgICBcImFjY2Vzc0ZvclwiOiB7XG4gICAgICAgIFwie3NpdGVOYW1lfVwiOiB7XG4gICAgICAgICAgXCJQT1NUXCI6IFwiZ3JhbnRVc2VyQWNjZXNzXCIsXG4gICAgICAgICAgXCJHRVRcIjogXCJnZXRTU09MaW5rXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdfQ==