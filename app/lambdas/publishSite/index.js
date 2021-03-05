"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const fetch = require("node-fetch");
// @ts-ignore
const headers = require("duda-aws-headers");
const { API_BASE = '' } = process.env;
async function handler(event) {
    var response = {
        body: '',
        statusCode: 400,
        headers: headers.response
    };
    try {
        const result = await publishSite(event.pathParameters.siteName);
        response.statusCode = result.statusCode;
        if (result.error) {
            response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": result.message
            });
        }
        else {
            response.body = JSON.stringify({
                "status": `Site ${event.pathParameters.siteName} published.`
            });
        }
    }
    catch (e) {
        response.body = JSON.stringify({
            "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
            "description": e
        });
    }
    return response;
}
exports.handler = handler;
const publishSite = async function (siteName) {
    const url = `${API_BASE}/sites/multiscreen/publish/${siteName}`;
    const options = {
        method: 'POST',
        headers: headers.request
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLFdBQVcsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRS9ELFFBQVEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUN2QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU87YUFDOUIsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLFFBQVEsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLGFBQWE7YUFDN0QsQ0FBQyxDQUFBO1NBQ0g7S0FFRjtJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBRVQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxvQkFBb0IsS0FBSyxDQUFDLFVBQVUsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDN0UsYUFBYSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0tBRUg7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUVqQixDQUFDO0FBbkNELDBCQW1DQztBQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssV0FBVSxRQUFhO0lBRTVDLE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSw4QkFBOEIsUUFBUSxFQUFFLENBQUE7SUFFL0QsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRSxPQUFPLENBQUMsT0FBTztLQUN6QixDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXBDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7SUFFdkMsT0FBTyxNQUFNLENBQUE7QUFFakIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCAqIGFzIGhlYWRlcnMgZnJvbSAnZHVkYS1hd3MtaGVhZGVycydcbmNvbnN0IHsgQVBJX0JBU0UgPSAnJyB9ID0gcHJvY2Vzcy5lbnZcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSkge1xuXG4gIHZhciByZXNwb25zZSA9IHtcbiAgICBib2R5OiAnJyxcbiAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgaGVhZGVyczogaGVhZGVycy5yZXNwb25zZVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHB1Ymxpc2hTaXRlKGV2ZW50LnBhdGhQYXJhbWV0ZXJzLnNpdGVOYW1lKVxuXG4gICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlc3VsdC5zdGF0dXNDb2RlXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiByZXN1bHQubWVzc2FnZSBcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIFwic3RhdHVzXCI6IGBTaXRlICR7ZXZlbnQucGF0aFBhcmFtZXRlcnMuc2l0ZU5hbWV9IHB1Ymxpc2hlZC5gXG4gICAgICB9KVxuICAgIH1cblxuICB9IGNhdGNoKGUpIHtcblxuICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBcImVycm9yXCI6IGBQcm9ibGVtIGhhbmRsaW5nICR7ZXZlbnQuaHR0cE1ldGhvZH0gb24gcmVzb3VyY2UgJHtldmVudC5yZXNvdXJjZX1gLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBlXG4gICAgfSlcblxuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlXG5cbn1cblxuY29uc3QgcHVibGlzaFNpdGUgPSBhc3luYyBmdW5jdGlvbihzaXRlTmFtZTogYW55KSB7XG5cbiAgICBjb25zdCB1cmwgPSBgJHtBUElfQkFTRX0vc2l0ZXMvbXVsdGlzY3JlZW4vcHVibGlzaC8ke3NpdGVOYW1lfWBcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMucmVxdWVzdFxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgcmVzdWx0LmVycm9yID0gcmVzcG9uc2Uub2tcbiAgICByZXN1bHQuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcblxuICAgIHJldHVybiByZXN1bHRcblxufVxuIl19