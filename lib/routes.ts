export default {
  "sites": {
    "POST": "createSite",
    "GET":  "getSites",
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
