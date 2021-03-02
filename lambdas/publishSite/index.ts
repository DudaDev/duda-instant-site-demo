// @ts-ignore
import * as fetch from 'node-fetch'
import headers from '../headers'
const { API_BASE = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const result = await publishSite(event.pathParameters.siteName)

    response.statusCode = result.statusCode
    if (result.error) {
      response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": result.message 
      })
    } else {
      response.body = JSON.stringify({
        "status": `Site ${event.pathParameters.siteName} published.`
      })
    }

  } catch(e) {

    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response

}

const publishSite = async function(siteName: any) {

    const url = `${API_BASE}/sites/multiscreen/publish/${siteName}`

    const options = {
      method: 'POST',
      headers: headers.request
    }

    const response = await fetch(url, options)
    const result = await response.json()

    result.error = response.ok
    result.statusCode = response.statusCode

    return result

}
