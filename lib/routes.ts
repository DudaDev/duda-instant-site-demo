export default {
  "sites": {
    "POST": "createSite",
    "GET":  "getSites",
    "DELETE": "deleteSites",
    "{siteName}": {
      "PATCH": "updateContent",
      "PUT": "updateContent",
      "DELETE": "deleteSite"
      "versions": {
          "POST": "publishSite"
      }
    }
  },
  "users": {
    "{userId}": {
      "POST": "createUser",
      "accessFor": {
        "{siteName}": {
          "POST": "grantUserAccess",
          "GET": "getSSOLink"
        }
      }
    }
  }
};
