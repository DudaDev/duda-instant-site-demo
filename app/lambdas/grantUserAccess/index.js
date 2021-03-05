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
        const result = await grantSiteAccess(event.pathParameters.userId, event.pathParameters.siteName);
        if (result.error) {
            response.body = JSON.stringify({
                "error": "Duda API responded with error.",
                "description": result.message
            });
        }
        else {
            response.body = JSON.stringify({
                "status": `User ${event.pathParameters.userId} was granted access to site ${event.pathParameters.siteName}.`
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
const grantSiteAccess = async function (userId, siteName) {
    const url = `${API_BASE}/accounts/${userId}/sites/${siteName}/permissions`;
    const options = {
        method: 'POST',
        headers: headers.request,
        body: JSON.stringify({
            permissions: [
                'STATS_TAB',
                'EDIT',
                'E_COMMERCE',
                'PUBLISH',
                'REPUBLISH',
                'DEV_MODE',
                'INSITE',
                'SEO',
                'BACKUPS',
                'CUSTOM_DOMAIN',
                'RESET',
                'BLOG',
                'PUSH_NOTIFICATIONS',
                'SITE_COMMENTS',
                'CONTENT_LIBRARY',
                'USE_APP',
                'CLIENT_MANAGE_FREE_APPS'
            ]
        })
    };
    const response = await fetch(url, options);
    var result = {
        statusCode: 500,
        error: true,
        message: ''
    } || await response.json();
    result.statusCode = response.statusCode;
    result.error = response.ok;
    return result;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2Isb0NBQW1DO0FBQ25DLGFBQWE7QUFDYiw0Q0FBMkM7QUFDM0MsTUFBTSxFQUFFLFFBQVEsR0FBRyxFQUFFLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0FBRTlCLEtBQUssVUFBVSxPQUFPLENBQUMsS0FBVTtJQUV0QyxJQUFJLFFBQVEsR0FBRztRQUNiLElBQUksRUFBRSxFQUFFO1FBQ1IsVUFBVSxFQUFFLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7S0FDMUIsQ0FBQTtJQUVELElBQUk7UUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLGVBQWUsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRWhHLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxnQ0FBZ0M7Z0JBQ3pDLGFBQWEsRUFBRSxNQUFNLENBQUMsT0FBTzthQUNoQyxDQUFDLENBQUE7U0FDRDthQUFNO1lBQ0wsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO2dCQUM3QixRQUFRLEVBQUUsUUFBUSxLQUFLLENBQUMsY0FBYyxDQUFDLE1BQU0sK0JBQStCLEtBQUssQ0FBQyxjQUFjLENBQUMsUUFBUSxHQUFHO2FBQzdHLENBQUMsQ0FBQTtTQUNIO0tBRUY7SUFBQyxPQUFNLENBQUMsRUFBRTtRQUVULFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztZQUM3QixPQUFPLEVBQUUsb0JBQW9CLEtBQUssQ0FBQyxVQUFVLGdCQUFnQixLQUFLLENBQUMsUUFBUSxFQUFFO1lBQzdFLGFBQWEsRUFBRSxDQUFDO1NBQ2pCLENBQUMsQ0FBQTtLQUVIO0lBRUQsT0FBTyxRQUFRLENBQUE7QUFFakIsQ0FBQztBQWxDRCwwQkFrQ0M7QUFFRCxNQUFNLGVBQWUsR0FBRyxLQUFLLFdBQVUsTUFBVyxFQUFFLFFBQWE7SUFFN0QsTUFBTSxHQUFHLEdBQUcsR0FBRyxRQUFRLGFBQWEsTUFBTSxVQUFVLFFBQVEsY0FBYyxDQUFBO0lBRTFFLE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLE1BQU07UUFDZCxPQUFPLEVBQUUsT0FBTyxDQUFDLE9BQU87UUFDeEIsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7WUFDbkIsV0FBVyxFQUFFO2dCQUNYLFdBQVc7Z0JBQ1gsTUFBTTtnQkFDTixZQUFZO2dCQUNaLFNBQVM7Z0JBQ1QsV0FBVztnQkFDWCxVQUFVO2dCQUNWLFFBQVE7Z0JBQ1IsS0FBSztnQkFDTCxTQUFTO2dCQUNULGVBQWU7Z0JBQ2YsT0FBTztnQkFDUCxNQUFNO2dCQUNOLG9CQUFvQjtnQkFDcEIsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLFNBQVM7Z0JBQ1QseUJBQXlCO2FBQzFCO1NBQ0YsQ0FBQztLQUNILENBQUE7SUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFMUMsSUFBSSxNQUFNLEdBQUc7UUFDWCxVQUFVLEVBQUUsR0FBRztRQUNmLEtBQUssRUFBRSxJQUFJO1FBQ1gsT0FBTyxFQUFFLEVBQUU7S0FDWixJQUFJLE1BQU0sUUFBUSxDQUFDLElBQUksRUFBRSxDQUFBO0lBRTFCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUN2QyxNQUFNLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxFQUFFLENBQUE7SUFFMUIsT0FBTyxNQUFNLENBQUE7QUFFakIsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQHRzLWlnbm9yZVxuaW1wb3J0ICogYXMgZmV0Y2ggZnJvbSAnbm9kZS1mZXRjaCdcbi8vIEB0cy1pZ25vcmVcbmltcG9ydCAqIGFzIGhlYWRlcnMgZnJvbSAnZHVkYS1hd3MtaGVhZGVycydcbmNvbnN0IHsgQVBJX0JBU0UgPSAnJyB9ID0gcHJvY2Vzcy5lbnZcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIoZXZlbnQ6IGFueSkge1xuXG4gIHZhciByZXNwb25zZSA9IHtcbiAgICBib2R5OiAnJyxcbiAgICBzdGF0dXNDb2RlOiA0MDAsXG4gICAgaGVhZGVyczogaGVhZGVycy5yZXNwb25zZVxuICB9XG5cbiAgdHJ5IHtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdyYW50U2l0ZUFjY2VzcyhldmVudC5wYXRoUGFyYW1ldGVycy51c2VySWQsIGV2ZW50LnBhdGhQYXJhbWV0ZXJzLnNpdGVOYW1lKVxuXG4gICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgcmVzcG9uc2UuYm9keSA9IEpTT04uc3RyaW5naWZ5KHsgXG4gICAgICAgIFwiZXJyb3JcIjogXCJEdWRhIEFQSSByZXNwb25kZWQgd2l0aCBlcnJvci5cIixcbiAgICAgICAgXCJkZXNjcmlwdGlvblwiOiByZXN1bHQubWVzc2FnZSBcbiAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBcInN0YXR1c1wiOiBgVXNlciAke2V2ZW50LnBhdGhQYXJhbWV0ZXJzLnVzZXJJZH0gd2FzIGdyYW50ZWQgYWNjZXNzIHRvIHNpdGUgJHtldmVudC5wYXRoUGFyYW1ldGVycy5zaXRlTmFtZX0uYFxuICAgICAgfSlcbiAgICB9XG5cbiAgfSBjYXRjaChlKSB7XG5cbiAgICByZXNwb25zZS5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgXCJlcnJvclwiOiBgUHJvYmxlbSBoYW5kbGluZyAke2V2ZW50Lmh0dHBNZXRob2R9IG9uIHJlc291cmNlICR7ZXZlbnQucmVzb3VyY2V9YCxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjogZVxuICAgIH0pXG5cbiAgfVxuXG4gIHJldHVybiByZXNwb25zZVxuXG59XG5cbmNvbnN0IGdyYW50U2l0ZUFjY2VzcyA9IGFzeW5jIGZ1bmN0aW9uKHVzZXJJZDogYW55LCBzaXRlTmFtZTogYW55KSB7XG5cbiAgICBjb25zdCB1cmwgPSBgJHtBUElfQkFTRX0vYWNjb3VudHMvJHt1c2VySWR9L3NpdGVzLyR7c2l0ZU5hbWV9L3Blcm1pc3Npb25zYFxuXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgaGVhZGVyczogaGVhZGVycy5yZXF1ZXN0LFxuICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICBwZXJtaXNzaW9uczogW1xuICAgICAgICAgICdTVEFUU19UQUInLFxuICAgICAgICAgICdFRElUJyxcbiAgICAgICAgICAnRV9DT01NRVJDRScsXG4gICAgICAgICAgJ1BVQkxJU0gnLFxuICAgICAgICAgICdSRVBVQkxJU0gnLFxuICAgICAgICAgICdERVZfTU9ERScsXG4gICAgICAgICAgJ0lOU0lURScsXG4gICAgICAgICAgJ1NFTycsXG4gICAgICAgICAgJ0JBQ0tVUFMnLFxuICAgICAgICAgICdDVVNUT01fRE9NQUlOJyxcbiAgICAgICAgICAnUkVTRVQnLFxuICAgICAgICAgICdCTE9HJyxcbiAgICAgICAgICAnUFVTSF9OT1RJRklDQVRJT05TJyxcbiAgICAgICAgICAnU0lURV9DT01NRU5UUycsXG4gICAgICAgICAgJ0NPTlRFTlRfTElCUkFSWScsXG4gICAgICAgICAgJ1VTRV9BUFAnLFxuICAgICAgICAgICdDTElFTlRfTUFOQUdFX0ZSRUVfQVBQUydcbiAgICAgICAgXVxuICAgICAgfSlcbiAgICB9XG5cbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucylcblxuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICBzdGF0dXNDb2RlOiA1MDAsXG4gICAgICBlcnJvcjogdHJ1ZSxcbiAgICAgIG1lc3NhZ2U6ICcnXG4gICAgfSB8fCBhd2FpdCByZXNwb25zZS5qc29uKClcblxuICAgIHJlc3VsdC5zdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZVxuICAgIHJlc3VsdC5lcnJvciA9IHJlc3BvbnNlLm9rXG5cbiAgICByZXR1cm4gcmVzdWx0XG5cbn1cbiJdfQ==