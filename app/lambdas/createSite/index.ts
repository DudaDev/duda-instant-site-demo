// @ts-ignore
import * as fetch from 'node-fetch'
// @ts-ignore
import headers from 'headers'
const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const templateId = JSON.parse(event.body).templateId
    const result = await createSite(templateId)
    response.statusCode = result.statusCode

    if (result.error) {
      result.statusCode == 403 ? response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": "Unable to authenticate with the Duda API" 
      }) : response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": JSON.stringify(result.message)  
      })
    } else {
      response.body = JSON.stringify({
        'siteName': result['site_name']
      })
    }

  } catch(e) {

    response.statusCode = 500
    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response

}

const createSite = async function(template: object) {

    const url = `${API_BASE}/sites/multiscreen/create`

    const options = {
      method: 'POST',
      headers: headers.request(API_USER, API_PASS),
      body: JSON.stringify({
        template_id: template
      })
    }

    const response = await fetch(url, options)
    const result = await response.json()

    result.error = response.ok
    result.statusCode = response.statusCode

    return result

}