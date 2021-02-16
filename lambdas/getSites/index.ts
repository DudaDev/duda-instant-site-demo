// @ts-ignore
import * as fetch from 'node-fetch';

const { API_BASE, API_USER, API_PASS } = process.env
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
    const sites = await getSites()
    const json = await sites.json()
    
    response.statusCode = 200
    response.body =  JSON.stringify(json)

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
      headers: headers
    }

    return fetch(url, options)
}
