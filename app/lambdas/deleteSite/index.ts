// @ts-ignore
import * as fetch from 'node-fetch'
// @ts-ignore
import * as headers from 'duda-aws-headers'
const { API_BASE = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const result = await deleteSite(event.pathParameters.siteName)
    response.statusCode = result.statusCode

    if (result.error) {
      response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": result.message 
      })
    } else {
      response.body = JSON.stringify({
        "status": `Site ${event.pathParameters.siteName} deleted.`
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

const deleteSite = async function(siteName: any) {

    const url = `${API_BASE}/sites/multiscreen/${siteName}`

    const options = {
      method: 'DELETE',
      headers: headers.request
    }

    const response = await fetch(url, options)

    var result = {
      statusCode: 500,
      error: true,
      message: await response.json()
    }

    result.statusCode = response.statusCode
    result.error = response.ok

    return result

}