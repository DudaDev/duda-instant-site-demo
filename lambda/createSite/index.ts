const fetch = require('node-fetch')

const { API_BASE, API_USER, API_PASS } = process.env;
const buffer = Buffer.from(`${API_USER}:${API_PASS}`);
const API_AUTH = buffer.toString('base64');

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${API_AUTH}`
};

exports.handler = async function (event: AWSLambda.APIGatewayEvent) {
  const response = {
    body: '',
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const templateId = JSON.parse(event.body).templateId
    if (await templateExists(templateId)) {
      const siteName = await createSite(templateId)

      response.statusCode = 200
      response.body = JSON.stringify({
        'siteName': siteName
      })

    } else {
      response.body = JSON.stringify({
        'error': `Unknown template ${templateId}.`
      })
    }
  } catch(e) {
    response.statusCode = 500
    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })
  }

  return response;

};

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

const templateExists = async function(id) {
    const url = `${API_BASE}/sites/multiscreen/templates`

    const options = {
      method: 'GET',
      headers: headers
    }

    const response = await fetch(url, options)
    const json = await response.json()

    var match = false
    json.forEach(template => if (template.template_id) match = true)

    return match

}

