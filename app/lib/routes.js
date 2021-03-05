"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "sites": {
        "POST": "createSite",
        "GET": "getSites",
        "DELETE": "deleteSites",
        "OPTIONS": "sitesOptions",
        "{siteName}": {
            "PATCH": "updateContent",
            "PUT": "updateContent",
            "DELETE": "deleteSite",
            "OPTIONS": "siteNameOptions",
            "versions": {
                "POST": "publishSite",
                "OPTIONS": "versionsOptions"
            }
        }
    },
    "users": {
        "POST": "createUser",
        "OPTIONS": "usersOptions",
        "{userId}": {
            "accessFor": {
                "{siteName}": {
                    "POST": "grantUserAccess",
                    "OPTIONS": "userAccessForOptions",
                    "GET": "getSSOLink"
                }
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUcsVUFBVTtRQUNsQixRQUFRLEVBQUUsYUFBYTtRQUN2QixTQUFTLEVBQUUsY0FBYztRQUN6QixZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsZUFBZTtZQUN4QixLQUFLLEVBQUUsZUFBZTtZQUN0QixRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsYUFBYTtnQkFDckIsU0FBUyxFQUFFLGlCQUFpQjthQUMvQjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixTQUFTLEVBQUUsY0FBYztRQUN6QixVQUFVLEVBQUU7WUFDVixXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNaLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIFwic2l0ZXNcIjoge1xuICAgIFwiUE9TVFwiOiBcImNyZWF0ZVNpdGVcIixcbiAgICBcIkdFVFwiOiAgXCJnZXRTaXRlc1wiLFxuICAgIFwiREVMRVRFXCI6IFwiZGVsZXRlU2l0ZXNcIixcbiAgICBcIk9QVElPTlNcIjogXCJzaXRlc09wdGlvbnNcIixcbiAgICBcIntzaXRlTmFtZX1cIjoge1xuICAgICAgXCJQQVRDSFwiOiBcInVwZGF0ZUNvbnRlbnRcIixcbiAgICAgIFwiUFVUXCI6IFwidXBkYXRlQ29udGVudFwiLFxuICAgICAgXCJERUxFVEVcIjogXCJkZWxldGVTaXRlXCIsXG4gICAgICBcIk9QVElPTlNcIjogXCJzaXRlTmFtZU9wdGlvbnNcIixcbiAgICAgIFwidmVyc2lvbnNcIjoge1xuICAgICAgICAgIFwiUE9TVFwiOiBcInB1Ymxpc2hTaXRlXCIsXG4gICAgICAgICAgXCJPUFRJT05TXCI6IFwidmVyc2lvbnNPcHRpb25zXCJcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwidXNlcnNcIjoge1xuICAgIFwiUE9TVFwiOiBcImNyZWF0ZVVzZXJcIixcbiAgICBcIk9QVElPTlNcIjogXCJ1c2Vyc09wdGlvbnNcIixcbiAgICBcInt1c2VySWR9XCI6IHtcbiAgICAgIFwiYWNjZXNzRm9yXCI6IHtcbiAgICAgICAgXCJ7c2l0ZU5hbWV9XCI6IHtcbiAgICAgICAgICBcIlBPU1RcIjogXCJncmFudFVzZXJBY2Nlc3NcIixcbiAgICAgICAgICBcIk9QVElPTlNcIjogXCJ1c2VyQWNjZXNzRm9yT3B0aW9uc1wiLFxuICAgICAgICAgIFwiR0VUXCI6IFwiZ2V0U1NPTGlua1wiXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG4iXX0=