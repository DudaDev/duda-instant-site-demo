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
        const templateId = JSON.parse(event.body).templateId;
        const result = await createSite(templateId);
        response.statusCode = result.statusCode;
        if (result.error) {
            response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": result.message
            });
        }
        else {
            response.body = JSON.stringify({
                'siteName': result['site_name']
            });
        }
    }
    catch (e) {
        response.statusCode = 500;
        response.body = JSON.stringify({
            "error": `Problem handling ${event.httpMethod} on resource ${event.resource}`,
            "description": e
        });
    }
    return response;
}
exports.handler = handler;
const createSite = async function (template) {
    const url = `${API_BASE}/sites/multiscreen/create`;
    const options = {
        method: 'POST',
        headers: headers.request,
        body: JSON.stringify({
            template_id: template
        })
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUE7UUFDcEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDM0MsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO1FBRXZDLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSxNQUFNLENBQUMsT0FBTzthQUM5QixDQUFDLENBQUE7U0FDSDthQUFNO1lBQ0wsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixVQUFVLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxDQUFDLENBQUE7U0FDSDtLQUVGO0lBQUMsT0FBTSxDQUFDLEVBQUU7UUFFVCxRQUFRLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQTtRQUN6QixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDN0IsT0FBTyxFQUFFLG9CQUFvQixLQUFLLENBQUMsVUFBVSxnQkFBZ0IsS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUM3RSxhQUFhLEVBQUUsQ0FBQztTQUNqQixDQUFDLENBQUE7S0FFSDtJQUVELE9BQU8sUUFBUSxDQUFBO0FBRWpCLENBQUM7QUFyQ0QsMEJBcUNDO0FBRUQsTUFBTSxVQUFVLEdBQUcsS0FBSyxXQUFVLFFBQWdCO0lBRTlDLE1BQU0sR0FBRyxHQUFHLEdBQUcsUUFBUSwyQkFBMkIsQ0FBQTtJQUVsRCxNQUFNLE9BQU8sR0FBRztRQUNkLE1BQU0sRUFBRSxNQUFNO1FBQ2QsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO1FBQ3hCLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ25CLFdBQVcsRUFBRSxRQUFRO1NBQ3RCLENBQUM7S0FDSCxDQUFBO0lBRUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxDQUFBO0lBQzFDLE1BQU0sTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRXBDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxVQUFVLENBQUE7SUFFdkMsT0FBTyxNQUFNLENBQUE7QUFFakIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCAqIGFzIGhlYWRlcnMgZnJvbSAnZHVkYS1hd3MtaGVhZGVycydcbmNvbnN0IHsgQVBJX0JBU0UgPSAnJyB9ID0gcHJvY2Vzcy5lbnZcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSkge1xuXG4gIHZhciByZXNwb25zZSA9IHtcbiAgICBib2R5OiAnJyxcbiAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgaGVhZGVyczogaGVhZGVycy5yZXNwb25zZVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGNvbnN0IHRlbXBsYXRlSWQgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpLnRlbXBsYXRlSWRcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBjcmVhdGVTaXRlKHRlbXBsYXRlSWQpXG4gICAgcmVzcG9uc2Uuc3RhdHVzQ29kZSA9IHJlc3VsdC5zdGF0dXNDb2RlXG5cbiAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoeyBcbiAgICAgICAgXCJlcnJvclwiOiBcIkR1ZGEgQVBJIHJlc3BvbmRlZCB3aXRoIGVycm9yLlwiLFxuICAgICAgICBcImRlc2NyaXB0aW9uXCI6IHJlc3VsdC5tZXNzYWdlIFxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgJ3NpdGVOYW1lJzogcmVzdWx0WydzaXRlX25hbWUnXVxuICAgICAgfSlcbiAgICB9XG5cbiAgfSBjYXRjaChlKSB7XG5cbiAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gNTAwXG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIFwiZXJyb3JcIjogYFByb2JsZW0gaGFuZGxpbmcgJHtldmVudC5odHRwTWV0aG9kfSBvbiByZXNvdXJjZSAke2V2ZW50LnJlc291cmNlfWAsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IGVcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBjcmVhdGVTaXRlID0gYXN5bmMgZnVuY3Rpb24odGVtcGxhdGU6IG9iamVjdCkge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QVBJX0JBU0V9L3NpdGVzL211bHRpc2NyZWVuL2NyZWF0ZWBcblxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgIGhlYWRlcnM6IGhlYWRlcnMucmVxdWVzdCxcbiAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgdGVtcGxhdGVfaWQ6IHRlbXBsYXRlXG4gICAgICB9KVxuICAgIH1cblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsLCBvcHRpb25zKVxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKVxuXG4gICAgcmVzdWx0LmVycm9yID0gcmVzcG9uc2Uub2tcbiAgICByZXN1bHQuc3RhdHVzQ29kZSA9IHJlc3BvbnNlLnN0YXR1c0NvZGVcblxuICAgIHJldHVybiByZXN1bHRcblxufSJdfQ==