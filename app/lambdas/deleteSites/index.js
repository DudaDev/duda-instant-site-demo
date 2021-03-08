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
        const sites = event.body;
        var error = false;
        var message = '';
        var status = response.statusCode;
        var deleted = [];
        var notDeleted = [];
        sites.forEach(async (site) => {
            const result = await deleteSite(site.siteName);
            if (result.error) {
                error = result.error;
                message = result.message;
                status = result.statusCode;
                notDeleted.push(site);
            }
            else {
                deleted.push(site);
            }
        });
        response.statusCode = status;
        if (error) {
            if (deleted.length == 0) {
                response.body = JSON.stringify({
                    "error": `Sites not deleted: ${JSON.stringify(notDeleted)}`,
                    "description": message
                });
            }
            else if (deleted.length > 0) {
                response.body = JSON.stringify({
                    "error": `Some sites were deleted: ${JSON.stringify(deleted)}`,
                    "description": message
                });
            }
        }
        else {
            response.body = JSON.stringify({
                "status": "All provided sites were deleted."
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
const deleteSite = async function (siteName) {
    const url = `${API_BASE}/sites/multiscreen/${siteName}`;
    const options = {
        method: 'DELETE',
        headers: headers.request
    };
    const response = await fetch(url, options);
    const result = await response.json();
    result.error = response.ok;
    result.statusCode = response.statusCode;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFBO1FBRXhCLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUNqQixJQUFJLE9BQU8sR0FBRyxFQUFFLENBQUE7UUFDaEIsSUFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTtRQUVoQyxJQUFJLE9BQU8sR0FBVSxFQUFFLENBQUE7UUFDdkIsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFBO1FBRTFCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQVMsRUFBRSxFQUFFO1lBQ2hDLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM5QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7Z0JBQ2hCLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO2dCQUNwQixPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtnQkFDeEIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7Z0JBQzFCLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7YUFDdEI7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNuQjtRQUNILENBQUMsQ0FBQyxDQUFBO1FBRUYsUUFBUSxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7UUFFNUIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUN2QixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzdCLE9BQU8sRUFBRSxzQkFBc0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDM0QsYUFBYSxFQUFFLE9BQU87aUJBQ3ZCLENBQUMsQ0FBQTthQUNIO2lCQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztvQkFDN0IsT0FBTyxFQUFFLDRCQUE0QixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUM5RCxhQUFhLEVBQUUsT0FBTztpQkFDdkIsQ0FBQyxDQUFBO2FBQ0g7U0FDRjthQUFNO1lBQ0wsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixRQUFRLEVBQUUsa0NBQWtDO2FBQzdDLENBQUMsQ0FBQTtTQUNIO0tBRUY7SUFBQyxPQUFNLENBQUMsRUFBRTtRQUVULFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixPQUFPLEVBQUUsb0JBQW9CLEtBQUssQ0FBQyxVQUFVLGdCQUFnQixLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzdFLGFBQWEsRUFBRSxDQUFDO1NBQ2pCLENBQUMsQ0FBQTtLQUVIO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFFakIsQ0FBQztBQTlERCwwQkE4REM7QUFFRCxNQUFNLFVBQVUsR0FBRyxLQUFLLFdBQVUsUUFBYTtJQUUzQyxNQUFNLEdBQUcsR0FBRyxHQUFHLFFBQVEsc0JBQXNCLFFBQVEsRUFBRSxDQUFBO0lBRXZELE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLFFBQVE7UUFDaEIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxPQUFPO0tBQ3pCLENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFDMUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFcEMsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsRUFBRSxDQUFBO0lBQzFCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUV2QyxPQUFPLE1BQU0sQ0FBQTtBQUVqQixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBmZXRjaCBmcm9tICdub2RlLWZldGNoJ1xuLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgaGVhZGVycyBmcm9tICdkdWRhLWF3cy1oZWFkZXJzJ1xuY29uc3QgeyBBUElfQkFTRSA9ICcnIH0gPSBwcm9jZXNzLmVudlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihldmVudDogYW55KSB7XG5cbiAgdmFyIHJlc3BvbnNlID0ge1xuICAgIGJvZHk6ICcnLFxuICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLnJlc3BvbnNlXG4gIH1cblxuICB0cnkge1xuXG4gICAgY29uc3Qgc2l0ZXMgPSBldmVudC5ib2R5XG5cbiAgICB2YXIgZXJyb3IgPSBmYWxzZVxuICAgIHZhciBtZXNzYWdlID0gJydcbiAgICB2YXIgc3RhdHVzID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuXG4gICAgdmFyIGRlbGV0ZWQ6IGFueVtdID0gW11cbiAgICB2YXIgbm90RGVsZXRlZDogYW55W10gPSBbXVxuXG4gICAgc2l0ZXMuZm9yRWFjaChhc3luYyAoc2l0ZTogYW55KSA9PiB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBkZWxldGVTaXRlKHNpdGUuc2l0ZU5hbWUpXG4gICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgIGVycm9yID0gcmVzdWx0LmVycm9yXG4gICAgICAgIG1lc3NhZ2UgPSByZXN1bHQubWVzc2FnZVxuICAgICAgICBzdGF0dXMgPSByZXN1bHQuc3RhdHVzQ29kZVxuICAgICAgICBub3REZWxldGVkLnB1c2goc2l0ZSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZWQucHVzaChzaXRlKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXNwb25zZS5zdGF0dXNDb2RlID0gc3RhdHVzXG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIGlmIChkZWxldGVkLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHJlc3BvbnNlLmJvZHkgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgXCJlcnJvclwiOiBgU2l0ZXMgbm90IGRlbGV0ZWQ6ICR7SlNPTi5zdHJpbmdpZnkobm90RGVsZXRlZCl9YCxcbiAgICAgICAgICBcImRlc2NyaXB0aW9uXCI6IG1lc3NhZ2UgXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2UgaWYgKGRlbGV0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgIFwiZXJyb3JcIjogYFNvbWUgc2l0ZXMgd2VyZSBkZWxldGVkOiAke0pTT04uc3RyaW5naWZ5KGRlbGV0ZWQpfWAsXG4gICAgICAgICAgXCJkZXNjcmlwdGlvblwiOiBtZXNzYWdlIFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBcInN0YXR1c1wiOiBcIkFsbCBwcm92aWRlZCBzaXRlcyB3ZXJlIGRlbGV0ZWQuXCJcbiAgICAgIH0pXG4gICAgfVxuXG4gIH0gY2F0Y2goZSkge1xuXG4gICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIFwiZXJyb3JcIjogYFByb2JsZW0gaGFuZGxpbmcgJHtldmVudC5odHRwTWV0aG9kfSBvbiByZXNvdXJjZSAke2V2ZW50LnJlc291cmNlfWAsXG4gICAgICBcImRlc2NyaXB0aW9uXCI6IGVcbiAgICB9KVxuXG4gIH1cblxuICByZXR1cm4gcmVzcG9uc2VcblxufVxuXG5jb25zdCBkZWxldGVTaXRlID0gYXN5bmMgZnVuY3Rpb24oc2l0ZU5hbWU6IGFueSkge1xuXG4gICAgY29uc3QgdXJsID0gYCR7QVBJX0JBU0V9L3NpdGVzL211bHRpc2NyZWVuLyR7c2l0ZU5hbWV9YFxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ0RFTEVURScsXG4gICAgICBoZWFkZXJzOiBoZWFkZXJzLnJlcXVlc3RcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIHJlc3VsdC5lcnJvciA9IHJlc3BvbnNlLm9rXG4gICAgcmVzdWx0LnN0YXR1c0NvZGUgPSByZXNwb25zZS5zdGF0dXNDb2RlXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbn1cbiJdfQ==