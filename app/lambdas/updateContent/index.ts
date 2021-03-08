// @ts-ignore
import * as fetch from 'node-fetch'
// @ts-ignore
import headers from 'headers'
import { RestApi } from '@aws-cdk/aws-apigateway'
const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const result = await uploadData(event.pathParameters.siteName, event.body)
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
        "status": `Content for site ${event.pathParameters.siteName} was updated.`
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

const uploadData = async function(siteName: any, content: any) {

  const url = `${API_BASE}/sites/multiscreen/${siteName}/content`

  const options = {
    method: 'POST',
    headers: headers.request(API_USER, API_PASS),
    body: content
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
