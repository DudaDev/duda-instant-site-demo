const fetch = require('node-fetch')

const { API_BASE, API_USER, API_PASS } = process.env
const buffer = Buffer.from(`${API_USER}:${API_PASS}`)
const API_AUTH = buffer.toString('base64')

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Basic ${API_AUTH}`
}

exports.handler =  async function(event, context) {

  var response = {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json"
    }
  }

  try {

    const userId = await getUser(event.pathParameters.userId)

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

const getUser = async function(event, context) {

    const userId = 'xxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
    })

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