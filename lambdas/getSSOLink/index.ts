const fetch = require('node-fetch')

const { API_BASE, API_USER, API_PASS } = process.env
const buffer = Buffer.from(`${API_USER}:${API_PASS}`)
const API_AUTH = buffer.toString('base64')

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${API_AUTH}`
}

exports.handler =  async function(event, context) {

  var response = {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {

    const ssoLink = await getSSOLink(event.pathParameters.userId, event.body.siteName)

    response.statusCode = 200
    response.body = JSON.stringify({
      "url": ssoLink
    })

  } catch(e) {

    rresponse.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response

}

const getSSOLink = async function(userId, siteName) {

    const url = `${API_BASE}/accounts/sso/${userId}/link?target=EDITOR&site_name=${siteName}`

    const options = {
      method: 'GET',
      headers: headers
    }

    var response = await fetch(url, options)
    var json = await response.json()

    return json.url

}
