"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
// @ts-ignore
const headers = require("duda-aws-headers");
async function handler() {
    return {
        statusCode: 200,
        body: JSON.stringify({ version: "process.env.npm_package_version" }),
        headers: headers.response
    };
}
exports.handler = handler;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxhQUFhO0FBQ2IsNENBQTJDO0FBRXBDLEtBQUssVUFBVSxPQUFPO0lBQzNCLE9BQU87UUFDTCxVQUFVLEVBQUUsR0FBRztRQUNmLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEVBQUUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLENBQUM7UUFDcEUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxRQUFRO0tBQzFCLENBQUE7QUFDSCxDQUFDO0FBTkQsMEJBTUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBAdHMtaWdub3JlXG5pbXBvcnQgKiBhcyBoZWFkZXJzIGZyb20gJ2R1ZGEtYXdzLWhlYWRlcnMnXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICByZXR1cm4ge1xuICAgIHN0YXR1c0NvZGU6IDIwMCxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHZlcnNpb246IFwicHJvY2Vzcy5lbnYubnBtX3BhY2thZ2VfdmVyc2lvblwiIH0pLFxuICAgIGhlYWRlcnM6IGhlYWRlcnMucmVzcG9uc2VcbiAgfVxufSJdfQ==