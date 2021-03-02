const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env
const AUTH = Buffer.from(`${API_USER}:${API_PASS}`).toString('base64')

export default {
    "request": {
        "Content-Type": "application/json",
        "Authorization": `Basic ${AUTH}`
    },
    "response": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE,PATCH"
    }
};