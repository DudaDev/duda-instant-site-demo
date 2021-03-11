"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const headers = require("headers");
async function handler() {
    const { VERSION } = process.env;
    return {
        statusCode: 200,
        body: JSON.stringify({ VERSION }),
        headers: headers.response
    };
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2IsbUNBQWtDO0FBRTNCLEtBQUssVUFBVSxPQUFPO0lBQzNCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFBO0lBQy9CLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUM7UUFDakMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRO0tBQzFCLENBQUE7QUFDSCxDQUFDO0FBUEQsMEJBT0MiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBoZWFkZXJzIGZyb20gJ2hlYWRlcnMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICBjb25zdCB7IFZFUlNJT04gfSA9IHByb2Nlc3MuZW52XG4gIHJldHVybiB7XG4gICAgc3RhdHVzQ29kZTogMjAwLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgVkVSU0lPTiB9KSxcbiAgICBoZWFkZXJzOiBoZWFkZXJzLnJlc3BvbnNlXG4gIH1cbn1cbiJdfQ==