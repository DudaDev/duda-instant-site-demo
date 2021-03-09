"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    "sites": {
        "POST": "createSite",
        "GET": "getSites",
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixLQUFLLEVBQUcsVUFBVTtRQUNsQixTQUFTLEVBQUUsY0FBYztRQUN6QixZQUFZLEVBQUU7WUFDWixPQUFPLEVBQUUsZUFBZTtZQUN4QixLQUFLLEVBQUUsZUFBZTtZQUN0QixRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLFVBQVUsRUFBRTtnQkFDUixNQUFNLEVBQUUsYUFBYTtnQkFDckIsU0FBUyxFQUFFLGlCQUFpQjthQUMvQjtTQUNGO0tBQ0Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxNQUFNLEVBQUUsWUFBWTtRQUNwQixTQUFTLEVBQUUsY0FBYztRQUN6QixVQUFVLEVBQUU7WUFDVixXQUFXLEVBQUU7Z0JBQ1gsWUFBWSxFQUFFO29CQUNaLE1BQU0sRUFBRSxpQkFBaUI7b0JBQ3pCLFNBQVMsRUFBRSxzQkFBc0I7b0JBQ2pDLEtBQUssRUFBRSxZQUFZO2lCQUNwQjthQUNGO1NBQ0Y7S0FDRjtDQUNGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCB7XG4gIFwic2l0ZXNcIjoge1xuICAgIFwiUE9TVFwiOiBcImNyZWF0ZVNpdGVcIixcbiAgICBcIkdFVFwiOiAgXCJnZXRTaXRlc1wiLFxuICAgIFwiT1BUSU9OU1wiOiBcInNpdGVzT3B0aW9uc1wiLFxuICAgIFwie3NpdGVOYW1lfVwiOiB7XG4gICAgICBcIlBBVENIXCI6IFwidXBkYXRlQ29udGVudFwiLFxuICAgICAgXCJQVVRcIjogXCJ1cGRhdGVDb250ZW50XCIsXG4gICAgICBcIkRFTEVURVwiOiBcImRlbGV0ZVNpdGVcIixcbiAgICAgIFwiT1BUSU9OU1wiOiBcInNpdGVOYW1lT3B0aW9uc1wiLFxuICAgICAgXCJ2ZXJzaW9uc1wiOiB7XG4gICAgICAgICAgXCJQT1NUXCI6IFwicHVibGlzaFNpdGVcIixcbiAgICAgICAgICBcIk9QVElPTlNcIjogXCJ2ZXJzaW9uc09wdGlvbnNcIlxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJ1c2Vyc1wiOiB7XG4gICAgXCJQT1NUXCI6IFwiY3JlYXRlVXNlclwiLFxuICAgIFwiT1BUSU9OU1wiOiBcInVzZXJzT3B0aW9uc1wiLFxuICAgIFwie3VzZXJJZH1cIjoge1xuICAgICAgXCJhY2Nlc3NGb3JcIjoge1xuICAgICAgICBcIntzaXRlTmFtZX1cIjoge1xuICAgICAgICAgIFwiUE9TVFwiOiBcImdyYW50VXNlckFjY2Vzc1wiLFxuICAgICAgICAgIFwiT1BUSU9OU1wiOiBcInVzZXJBY2Nlc3NGb3JPcHRpb25zXCIsXG4gICAgICAgICAgXCJHRVRcIjogXCJnZXRTU09MaW5rXCJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcbiJdfQ==