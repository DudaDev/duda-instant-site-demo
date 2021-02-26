// @ts-ignore
import * as fetch from 'node-fetch';

const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env
const buffer = Buffer.from(`${API_USER}:${API_PASS}`)
const API_AUTH = buffer.toString('base64')

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${API_AUTH}`
}

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {

    await publishSite(event.pathParameters.siteName)

    response.statusCode = 200
    response.body = `{"status":"Site ${event.pathParameters.siteName} published."}`

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
      headers: headers
    }

    return fetch(url, options)

}
