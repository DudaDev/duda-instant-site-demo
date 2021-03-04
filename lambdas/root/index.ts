// @ts-ignore
import * as headers from 'duda-aws-headers'

export async function handler() {
  return {
    statusCode: 200,
    body: JSON.stringify({ version: process.env.npm_package_version }),
    headers: headers.response
  }
}