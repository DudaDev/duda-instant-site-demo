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

    const sites = event.body

    var error = false
    var message = ''
    var status = response.statusCode

    var deleted: any[] = []
    var notDeleted: any[] = []

    sites.forEach(async (site: any) => {
      const result = await deleteSite(site.siteName)
      if (result.error) {
        error = result.error
        message = JSON.stringify(result.message)
        status = result.statusCode
        notDeleted.push(site)
      } else {
        deleted.push(site)
      }
    })

    response.statusCode = status

    if (error) {
      if (deleted.length == 0) {
        response.body = JSON.stringify({
          "error": `Sites not deleted: ${JSON.stringify(notDeleted)}`,
          "description": message 
        })
      } else if (deleted.length > 0) {
        response.body = JSON.stringify({
          "error": `Some sites were deleted: ${JSON.stringify(deleted)}`,
          "description": message 
        })
      }
    } else {
      response.body = JSON.stringify({
        "status": "All provided sites were deleted."
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
    if (response.error) {
      
      var result = {
        statusCode: 500,
        error: true,
        message: ''
      }
  
      result.statusCode = response.statusCode
      result.error = response.error
  
      return result

    } else {

      return await response.json()

    }

}
