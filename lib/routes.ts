export default {
  "sites": {
    "POST": "createSite",
    "GET":  "getSites",
    "{siteName}": {
      "DELETE": "deleteSite",
      "release": {
        "POST": "publishSite"
      }
    }
  },
  "users": {
    "POST": "createUser"
  }
};
  