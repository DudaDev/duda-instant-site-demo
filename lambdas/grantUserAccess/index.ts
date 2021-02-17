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

    await grantSiteAccess(event.pathParameters.userId, event.pathParameters.siteName)

    response.statusCode = 200
    response.body = `{"status":"User ${event.pathParameters.userId} was granted access to site ${event.pathParameters.siteName}."}`

  } catch(e) {

    response.body = JSON.stringify({
      "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
      "description": e
    })

  }

  return response

}

const grantSiteAccess = async function(userId: any, siteName: any) {

    const url = `${API_BASE}/accounts/${userId}/sites/${siteName}/permissions`

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        permissions: [
          'STATS_TAB',
          'EDIT',
          'E_COMMERCE',
          'PUBLISH',
          'REPUBLISH',
          'DEV_MODE',
          'INSITE',
          'SEO',
          'BACKUPS',
          'CUSTOM_DOMAIN',
          'RESET',
          'BLOG',
          'PUSH_NOTIFICATIONS',
          'SITE_COMMENTS',
          'CONTENT_LIBRARY',
          'USE_APP',
          'CLIENT_MANAGE_FREE_APPS'
        ]
      })
    }

    return fetch(url, options)

}
