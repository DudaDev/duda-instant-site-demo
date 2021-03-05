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

    const result = await getSSOLink(event.pathParameters.userId, event.pathParameters.siteName)
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
        "url": result.url
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

const getSSOLink = async function(userId: any, siteName: any) {

    const url = `${API_BASE}/accounts/sso/${userId}/link?target=EDITOR&site_name=${siteName}`

    const options = {
      method: 'GET',
      headers: headers.request
    }

    const response = await fetch(url, options)
    const result = await response.json()

    result.error = response.ok
    result.statusCode = response.statusCode

    return result

}
