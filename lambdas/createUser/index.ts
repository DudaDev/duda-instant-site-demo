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
  const userId = JSON.parse(event.body).userId

  try {

    const result = await getUser(userId)
    response.statusCode = result.statusCode

    if (result.error) {
      response.body = JSON.stringify({
        "error": result.message
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
      headers: headers.request,
      body: JSON.stringify({
        account_type: 'CUSTOMER',
        account_name: userId
      })
    }

    const response = await fetch(url, options)
    const result = await response.json()

    result.error = response.ok
    result.statusCode = response.statusCode

    return result

}
