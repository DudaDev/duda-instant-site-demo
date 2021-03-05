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
        const result = await uploadData(event.pathParameters.siteName, event.body);
        response.statusCode = result.statusCode;
        if (result.error) {
            result.statusCode == 403 ? response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": "Unable to authenticate with the Duda API"
            }) : response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": JSON.stringify(result.message)
            });
        }
        else {
            response.body = JSON.stringify({
                "status": `Content for site ${event.pathParameters.siteName} was updated.`
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
const uploadData = async function (siteName, content) {
    const url = `${API_BASE}/sites/multiscreen/${siteName}/content`;
    const options = {
        method: 'POST',
        headers: headers.request,
        body: content
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDMUUsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBRXZDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixNQUFNLENBQUMsVUFBVSxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUN4RCxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsMENBQTBDO2FBQzFELENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO2FBQzlDLENBQUMsQ0FBQTtTQUNIO2FBQU07WUFDTCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLFFBQVEsRUFBRSxvQkFBb0IsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLGVBQWU7YUFDM0UsQ0FBQyxDQUFBO1NBQ0g7S0FFRjtJQUFDLE9BQU0sQ0FBQyxFQUFFO1FBRVQsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzdCLE9BQU8sRUFBRSxvQkFBb0IsS0FBSyxDQUFDLFVBQVUsZ0JBQWdCLEtBQUssQ0FBQyxRQUFRLEVBQUU7WUFDN0UsYUFBYSxFQUFFLENBQUM7U0FDakIsQ0FBQyxDQUFBO0tBRUg7SUFFRCxPQUFPLFFBQVEsQ0FBQTtBQUVqQixDQUFDO0FBdENELDBCQXNDQztBQUVELE1BQU0sVUFBVSxHQUFHLEtBQUssV0FBVSxRQUFhLEVBQUUsT0FBWTtJQUUzRCxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsc0JBQXNCLFFBQVEsVUFBVSxDQUFBO0lBRS9ELE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsSUFBSSxFQUFFLE9BQU87S0FDZCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXBDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7SUFFdkMsT0FBTyxNQUFNLENBQUE7QUFFZixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgaGVhZGVycyBmcm9tICdkdWRhLWF3cy1oZWFkZXJzJ1xuY29uc3QgeyBBUElfQkFTRSA9ICcnIH0gPSBwcm9jZXNzLmVudlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogYW55KSB7XG5cbiAgdmFyIHJlc3BvbnNlID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLnJlc3BvbnNlXG4gIH1cblxuICB0cnkge1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBsb2FkRGF0YShldmVudC5wYXRoUGFyYW1ldGVycy5zaXRlTmFtZSwgZXZlbnQuYm9keSlcbiAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gcmVzdWx0LnN0YXR1c0NvZGVcblxuICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgIHJlc3VsdC5zdGF0dXNDb2RlID09IDQwMyA/IHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgICBcImVycm9yXCI6IFwiRHVkYSBBUEkgcmVzcG9uZGVkIHdpdGggZXJyb3IuXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogXCJVbmFibGUgdG8gYXV0aGVudGljYXRlIHdpdGggdGhlIER1ZGEgQVBJXCIgXG4gICAgICB9KSA6IHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7IFxuICAgICAgICBcImVycm9yXCI6IFwiRHVkYSBBUEkgcmVzcG9uZGVkIHdpdGggZXJyb3IuXCIsXG4gICAgICAgIFwiZGVzY3JpcHRpb25cIjogSlNPTi5zdHJpbmdpZnkocmVzdWx0Lm1lc3NhZ2UpICBcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgIFwic3RhdHVzXCI6IGBDb250ZW50IGZvciBzaXRlICR7ZXZlbnQucGF0aFBhcmFtZXRlcnMuc2l0ZU5hbWV9IHdhcyB1cGRhdGVkLmBcbiAgICAgIH0pXG4gICAgfVxuXG4gIH0gY2F0Y2goZSkge1xuXG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIFwiZXJyb3JcIjogYFByb2JsZW0gaGFuZGxpbmcgJHtldmVudC5odHRwTWV0aG9kfSBvbiByZXNvdXJjZSAke2V2ZW50LnJlc291cmNlfWAsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IGVcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCB1cGxvYWREYXRhID0gYXN5bmMgZnVuY3Rpb24oc2l0ZU5hbWU6IGFueSwgY29udGVudDogYW55KSB7XG5cbiAgY29uc3QgdXJsID0gYCR7QVBJX0JBU0V9L3NpdGVzL211bHRpc2NyZWVuLyR7c2l0ZU5hbWV9L2NvbnRlbnRgXG5cbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLnJlcXVlc3QsXG4gICAgYm9keTogY29udGVudFxuICB9XG5cbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpXG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gIHJlc3VsdC5lcnJvciA9IHJlc3BvbnNlLm9rXG4gIHJlc3VsdC5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXG4gIHJldHVybiByZXN1bHRcblxufVxuIl19