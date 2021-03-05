// @ts-ignore
import * as fetch from 'node-fetch'
// @ts-ignore
import headers = require('duda-aws-headers')
const { API_BASE = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const result = await getSites()
    response.statusCode = result.statusCode

    if (result.error) {
      result.statusCode == 403 ? response.body = JSON.stringify({ 
          "error": "Duda API responded with error.",
          "description": "Unable to authenticate with the Duda API" 
      }) : response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": "Unknown error." 
      }) 
    } else {
      response.body = JSON.stringify(result)
    }

  } catch(e) {

    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response
}

const getSites = async function() {

    const url = `${API_BASE}/sites/multiscreen/created?from=1900-01-01&to=9999-12-31`

    const options = {
      method: 'GET',
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
