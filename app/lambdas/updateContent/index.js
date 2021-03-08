"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const fetch = require("node-fetch");
// @ts-ignore
const headers_1 = require("headers");
const { API_BASE = '', API_USER = '', API_PASS = '' } = process.env;
async function handler(event) {
    var response = {
        body: '',
        statusCode: 400,
        headers: headers_1.default.response
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
        headers: headers_1.default.request(API_USER, API_PASS),
        body: content
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYixxQ0FBNkI7QUFDN0IsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsUUFBUSxHQUFHLEVBQUUsRUFBRSxRQUFRLEdBQUcsRUFBRSxFQUFFLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtBQUU1RCxLQUFLLFVBQVUsT0FBTyxDQUFDLEtBQVU7SUFFdEMsSUFBSSxRQUFRLEdBQUc7UUFDYixJQUFJLEVBQUUsRUFBRTtRQUNSLFVBQVUsRUFBRSxHQUFHO1FBQ2YsT0FBTyxFQUFFLGlCQUFPLENBQUMsUUFBUTtLQUMxQixDQUFBO0lBRUQsSUFBSTtRQUVGLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMxRSxRQUFRLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7UUFFdkMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO1lBQ2hCLE1BQU0sQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ3hELE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSwwQ0FBMEM7YUFDMUQsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7YUFDOUMsQ0FBQyxDQUFBO1NBQ0g7YUFBTTtZQUNMLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztnQkFDN0IsUUFBUSxFQUFFLG9CQUFvQixLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsZUFBZTthQUMzRSxDQUFDLENBQUE7U0FDSDtLQUVGO0lBQUMsT0FBTSxDQUFDLEVBQUU7UUFFVCxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDN0IsT0FBTyxFQUFFLG9CQUFvQixLQUFLLENBQUMsVUFBVSxnQkFBZ0IsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM3RSxhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFDLENBQUE7S0FFSDtJQUVELE9BQU8sUUFBUSxDQUFBO0FBRWpCLENBQUM7QUF0Q0QsMEJBc0NDO0FBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxXQUFVLFFBQWEsRUFBRSxPQUFZO0lBRTNELE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSxzQkFBc0IsUUFBUSxVQUFVLENBQUE7SUFFL0QsTUFBTSxPQUFPLEdBQUc7UUFDZCxNQUFNLEVBQUUsTUFBTTtRQUNkLE9BQU8sRUFBRSxpQkFBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQzVDLElBQUksRUFBRSxPQUFPO0tBQ2QsQ0FBQTtJQUVELE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUMxQyxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUVwQyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUE7SUFDMUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFBO0lBRXZDLE9BQU8sTUFBTSxDQUFBO0FBRWYsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCBoZWFkZXJzIGZyb20gJ2hlYWRlcnMnXG5jb25zdCB7IEFQSV9CQVNFID0gJycsIEFQSV9VU0VSID0gJycsIEFQSV9QQVNTID0gJycgfSA9IHByb2Nlc3MuZW52XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKGV2ZW50OiBhbnkpIHtcblxuICB2YXIgcmVzcG9uc2UgPSB7XG4gICAgYm9keTogJycsXG4gICAgc3RhdHVzQ29kZTogNDAwLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMucmVzcG9uc2VcbiAgfVxuXG4gIHRyeSB7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGxvYWREYXRhKGV2ZW50LnBhdGhQYXJhbWV0ZXJzLnNpdGVOYW1lLCBldmVudC5ib2R5KVxuICAgIHJlc3BvbnNlLnN0YXR1c0NvZGUgPSByZXN1bHQuc3RhdHVzQ29kZVxuXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgcmVzdWx0LnN0YXR1c0NvZGUgPT0gNDAzID8gcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBcIlVuYWJsZSB0byBhdXRoZW50aWNhdGUgd2l0aCB0aGUgRHVkYSBBUElcIiBcbiAgICAgIH0pIDogcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBKU09OLnN0cmluZ2lmeShyZXN1bHQubWVzc2FnZSkgIFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgXCJzdGF0dXNcIjogYENvbnRlbnQgZm9yIHNpdGUgJHtldmVudC5wYXRoUGFyYW1ldGVycy5zaXRlTmFtZX0gd2FzIHVwZGF0ZWQuYFxuICAgICAgfSlcbiAgICB9XG5cbiAgfSBjYXRjaChlKSB7XG5cbiAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgXCJlcnJvclwiOiBgUHJvYmxlbSBoYW5kbGluZyAke2V2ZW50Lmh0dHBNZXRob2R9IG9uIHJlc291cmNlICR7ZXZlbnQucmVzb3VyY2V9YCxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogZVxuICAgIH0pXG5cbiAgfVxuXG4gIHJldHVybiByZXNwb25zZVxuXG59XG5cbmNvbnN0IHVwbG9hZERhdGEgPSBhc3luYyBmdW5jdGlvbihzaXRlTmFtZTogYW55LCBjb250ZW50OiBhbnkpIHtcblxuICBjb25zdCB1cmwgPSBgJHtBUElfQkFTRX0vc2l0ZXMvbXVsdGlzY3JlZW4vJHtzaXRlTmFtZX0vY29udGVudGBcblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMucmVxdWVzdChBUElfVVNFUiwgQVBJX1BBU1MpLFxuICAgIGJvZHk6IGNvbnRlbnRcbiAgfVxuXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKVxuICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICByZXN1bHQuZXJyb3IgPSByZXNwb25zZS5va1xuICByZXN1bHQuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcblxuICByZXR1cm4gcmVzdWx0XG5cbn1cbiJdfQ==