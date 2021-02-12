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
    const templateId = JSON.parse(event.body).templateId

    const siteName = await createSite(templateId)
    response.statusCode = 200
    response.body = JSON.stringify({
      'siteName': siteName
    })

  } catch(e) {
    response.statusCode = 500
    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })
  }
    
    return response;

}

const createSite = async function(template) {

    const url = `${API_BASE}/sites/multiscreen/create`

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        template_id: template
      })
    }

    const response = await fetch(url, options)
    const json = await response.json()

    return json['site_name']

}
