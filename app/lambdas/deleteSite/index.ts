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

    const result = await deleteSite(event.pathParameters.siteName)
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
      headers: headers.request(API_USER, API_PASS)
    }

    const response = await fetch(url, options)

    var result = {
      statusCode: 500,
      error: true,
      message: ''
    }
  
    result.statusCode = response.statusCode
    result.error = response.error
    
    if (response.error) {
      const error = await response.json()
      result.message = error.message
    }
  
    return result

}
