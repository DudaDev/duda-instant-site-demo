exports.handler = async function(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({ version: '1.0.0' }),
    headers: {
      "Content-Type": "application/json"
    }
  }
}
