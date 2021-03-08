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
        const result = await getSSOLink(event.pathParameters.userId, event.pathParameters.siteName);
        response.statusCode = result.statusCode;
        if (result.error) {
            response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": result.message
            });
        }
        else {
            response.body = JSON.stringify({
                "url": result.url
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
const getSSOLink = async function (userId, siteName) {
    const url = `${API_BASE}/accounts/sso/${userId}/link?target=EDITOR&site_name=${siteName}`;
    const options = {
        method: 'GET',
        headers: headers.request
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzNGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUV2QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7WUFDaEIsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixPQUFPLEVBQUUsZ0NBQWdDO2dCQUN6QyxhQUFhLEVBQUUsTUFBTSxDQUFDLE9BQU87YUFDaEMsQ0FBQyxDQUFBO1NBQ0Q7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsS0FBSyxFQUFFLE1BQU0sQ0FBQyxHQUFHO2FBQ2xCLENBQUMsQ0FBQTtTQUNIO0tBRUY7SUFBQyxPQUFNLENBQUMsRUFBRTtRQUVULFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixPQUFPLEVBQUUsb0JBQW9CLEtBQUssQ0FBQyxVQUFVLGdCQUFnQixLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzdFLGFBQWEsRUFBRSxDQUFDO1NBQ2pCLENBQUMsQ0FBQTtLQUVIO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFFakIsQ0FBQztBQW5DRCwwQkFtQ0M7QUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLFdBQVUsTUFBVyxFQUFFLFFBQWE7SUFFeEQsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLGlCQUFpQixNQUFNLGlDQUFpQyxRQUFRLEVBQUUsQ0FBQTtJQUV6RixNQUFNLE9BQU8sR0FBRztRQUNkLE1BQU0sRUFBRSxLQUFLO1FBQ2IsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0tBQ3pCLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDMUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFcEMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFBO0lBQzFCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUV2QyxPQUFPLE1BQU0sQ0FBQTtBQUVqQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgaGVhZGVycyBmcm9tICdkdWRhLWF3cy1oZWFkZXJzJ1xuY29uc3QgeyBBUElfQkFTRSA9ICcnIH0gPSBwcm9jZXNzLmVudlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogYW55KSB7XG5cbiAgdmFyIHJlc3BvbnNlID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLnJlc3BvbnNlXG4gIH1cblxuICB0cnkge1xuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0U1NPTGluayhldmVudC5wYXRoUGFyYW1ldGVycy51c2VySWQsIGV2ZW50LnBhdGhQYXJhbWV0ZXJzLnNpdGVOYW1lKVxuICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXN1bHQuc3RhdHVzQ29kZVxuXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiByZXN1bHQubWVzc2FnZSBcbiAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBcInVybFwiOiByZXN1bHQudXJsXG4gICAgICB9KVxuICAgIH1cblxuICB9IGNhdGNoKGUpIHtcblxuICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBcImVycm9yXCI6IGBQcm9ibGVtIGhhbmRsaW5nICR7ZXZlbnQuaHR0cE1ldGhvZH0gb24gcmVzb3VyY2UgJHtldmVudC5yZXNvdXJjZX1gLFxuICAgICAgXCJkZXNjcmlwdGlvblwiOiBlXG4gICAgfSlcblxuICB9XG5cbiAgcmV0dXJuIHJlc3BvbnNlXG5cbn1cblxuY29uc3QgZ2V0U1NPTGluayA9IGFzeW5jIGZ1bmN0aW9uKHVzZXJJZDogYW55LCBzaXRlTmFtZTogYW55KSB7XG5cbiAgICBjb25zdCB1cmwgPSBgJHtBUElfQkFTRX0vYWNjb3VudHMvc3NvLyR7dXNlcklkfS9saW5rP3RhcmdldD1FRElUT1Imc2l0ZV9uYW1lPSR7c2l0ZU5hbWV9YFxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLnJlcXVlc3RcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIHJlc3VsdC5lcnJvciA9IHJlc3BvbnNlLm9rXG4gICAgcmVzdWx0LnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbn1cbiJdfQ==