const headers = {
    "request": (user: string,pass: string) => {
        return {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
        }
    },
    "response": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE,PATCH"
    }
}
export default headers