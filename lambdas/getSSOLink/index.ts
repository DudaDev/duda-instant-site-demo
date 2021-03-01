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
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "false",
      "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE,PATCH",
    }
  }

  try {

    const ssoLink = await getSSOLink(event.pathParameters.userId, event.pathParameters.siteName)

    response.statusCode = 200
    response.body = JSON.stringify({
      "url": ssoLink
    })

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
      headers: headers
    }

    var response = await fetch(url, options)
    var json = await response.json()

    return json.url

}
