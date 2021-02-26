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

    const userId = await getUser(JSON.parse(event.body).userId)

    response.statusCode = 200
    response.body = JSON.stringify({
      "userId": userId
    })

  } catch(e) {

    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response

}

const getUser = async function(userId: string) {

    if (userId == '') {
      userId = 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
          return v.toString(16)
      })
    }

    const url = `${API_BASE}/accounts/create`

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        account_type: 'CUSTOMER',
        account_name: userId
      })
    }

    await fetch(url, options)

    return userId

}
