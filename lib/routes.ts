export default {
  "sites": {
    "POST": "createSite", // not working, creates site but errors out. not sure why.
    "GET":  "getSites",
    "DELETE": "deleteSites",
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
    "POST": "createUser", // not working, pathParameter issue
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
