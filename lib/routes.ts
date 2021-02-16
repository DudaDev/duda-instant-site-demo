export default {
  "sites": {
    "POST": "createSite",
    "GET":  "getSites",
    "{siteName}": {
      "DELETE": "deleteSite",
      "releases": {
        "POST": "publishSite",
        "DELETE": "unpublishSite"
      }
    }
  },
  "users": {
    "POST": "createUser",
    "{userName}": {
      "access": {
        "POST": "grantUserAccess"
      }
    }
  }
};
  