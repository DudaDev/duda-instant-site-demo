// @ts-ignore
import * as fetch from 'node-fetch'
import headers from '../headers'
const { API_BASE = '' } = process.env

export async function handler(event: any) {

  var response = {
    body: '',
    statusCode: 400,
    headers: headers.response
  }

  try {

    const result = await grantSiteAccess(event.pathParameters.userId, event.pathParameters.siteName)

    if (result.error) {
      response.body = JSON.stringify({ 
        "error": "Duda API responded with error.",
        "description": result.message 
    })
    } else {
      response.body = JSON.stringify({
        "status": `User ${event.pathParameters.userId} was granted access to site ${event.pathParameters.siteName}.`
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

const grantSiteAccess = async function(userId: any, siteName: any) {

    const url = `${API_BASE}/accounts/${userId}/sites/${siteName}/permissions`

    const options = {
      method: 'POST',
      headers: headers.request,
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

    const response = await fetch(url, options)

    var result = {
      statusCode: 500,
      error: true,
      message: ''
    } || await response.json()

    result.statusCode = response.statusCode
    result.error = response.ok

    return result

}
