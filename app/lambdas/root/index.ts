// @ts-ignore
import * as headers from 'headers'

export async function handler() {
  const { VERSION } = process.env
  return {
    statusCode: 200,
    body: JSON.stringify({ VERSION }),
    headers: headers.response
  }
}
