export default {
  "sites": {
    "POST": "createSite",
    "GET":  "getSites",
    "{site_name}": {
      "DELETE": "deleteSite",
      "release": {
        "POST": "publishSite"
      }
    }
  },
  "users": {
    "POST": "createUser",
    "access": {
      "POST": "grantUserAccess",
      "{site_name}": {
        "GET": "getSSOLink"
      }
    }
  }
};
  