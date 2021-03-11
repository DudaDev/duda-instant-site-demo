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
  const userId = JSON.parse(event.body).userId

  try {

    const result = await getUser(userId)
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
        "userId": userId
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
      headers: headers.request(API_USER, API_PASS),
      body: JSON.stringify({
        account_type: 'CUSTOMER',
        account_name: userId
      })
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
      const error = await response.json()
      result.message = error.message
  
      return result

    } else {

      return await response.json()

    }

}
