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
    "templates": {
        "GET": "getTemplates"
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUcsVUFBVTtRQUNsQixZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsZUFBZTtZQUN4QixLQUFLLEVBQUUsZUFBZTtZQUN0QixRQUFRLEVBQUUsWUFBWTtZQUN0QixVQUFVLEVBQUU7Z0JBQ1IsTUFBTSxFQUFFLGFBQWE7YUFDeEI7U0FDRjtLQUNGO0lBQ0QsV0FBVyxFQUFFO1FBQ1gsS0FBSyxFQUFFLGNBQWM7S0FDdEI7SUFDRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixVQUFVLEVBQUU7WUFDVixXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNaLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIFwic2l0ZXNcIjoge1xuICAgIFwiUE9TVFwiOiBcImNyZWF0ZVNpdGVcIixcbiAgICBcIkdFVFwiOiAgXCJnZXRTaXRlc1wiLFxuICAgIFwie3NpdGVOYW1lfVwiOiB7XG4gICAgICBcIlBBVENIXCI6IFwidXBkYXRlQ29udGVudFwiLFxuICAgICAgXCJQVVRcIjogXCJ1cGRhdGVDb250ZW50XCIsXG4gICAgICBcIkRFTEVURVwiOiBcImRlbGV0ZVNpdGVcIixcbiAgICAgIFwidmVyc2lvbnNcIjoge1xuICAgICAgICAgIFwiUE9TVFwiOiBcInB1Ymxpc2hTaXRlXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwidGVtcGxhdGVzXCI6IHtcbiAgICBcIkdFVFwiOiBcImdldFRlbXBsYXRlc1wiXG4gIH0sXG4gIFwidXNlcnNcIjoge1xuICAgIFwiUE9TVFwiOiBcImNyZWF0ZVVzZXJcIixcbiAgICBcInt1c2VySWR9XCI6IHtcbiAgICAgIFwiYWNjZXNzRm9yXCI6IHtcbiAgICAgICAgXCJ7c2l0ZU5hbWV9XCI6IHtcbiAgICAgICAgICBcIlBPU1RcIjogXCJncmFudFVzZXJBY2Nlc3NcIixcbiAgICAgICAgICBcIkdFVFwiOiBcImdldFNTT0xpbmtcIlxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuIl19