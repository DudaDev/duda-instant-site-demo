"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const headers = {
    "request": (user, pass) => {
        return {
            "Content-Type": "application/json",
            "Authorization": `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}`
        };
    },
    "response": {
        "Content-Type": "application/json",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": "false",
        "Access-Control-Allow-Methods": "OPTIONS,GET,PUT,POST,DELETE,PATCH"
    }
};
exports.default = headers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLE9BQU8sR0FBRztJQUNaLFNBQVMsRUFBRSxDQUFDLElBQVksRUFBQyxJQUFZLEVBQUUsRUFBRTtRQUNyQyxPQUFPO1lBQ0gsY0FBYyxFQUFFLGtCQUFrQjtZQUNsQyxlQUFlLEVBQUUsU0FBUyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1NBQ2hGLENBQUE7SUFDTCxDQUFDO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyw4QkFBOEIsRUFBRSx1RkFBdUY7UUFDdkgsNkJBQTZCLEVBQUUsR0FBRztRQUNsQyxrQ0FBa0MsRUFBRSxPQUFPO1FBQzNDLDhCQUE4QixFQUFFLG1DQUFtQztLQUN0RTtDQUNKLENBQUE7QUFDRCxrQkFBZSxPQUFPLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBoZWFkZXJzID0ge1xuICAgIFwicmVxdWVzdFwiOiAodXNlcjogc3RyaW5nLHBhc3M6IHN0cmluZykgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBcIkF1dGhvcml6YXRpb25cIjogYEJhc2ljICR7QnVmZmVyLmZyb20oYCR7dXNlcn06JHtwYXNzfWApLnRvU3RyaW5nKCdiYXNlNjQnKX1gXG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwicmVzcG9uc2VcIjoge1xuICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1IZWFkZXJzXCI6IFwiQ29udGVudC1UeXBlLFgtQW16LURhdGUsQXV0aG9yaXphdGlvbixYLUFwaS1LZXksWC1BbXotU2VjdXJpdHktVG9rZW4sWC1BbXotVXNlci1BZ2VudFwiLFxuICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIixcbiAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1DcmVkZW50aWFsc1wiOiBcImZhbHNlXCIsXG4gICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctTWV0aG9kc1wiOiBcIk9QVElPTlMsR0VULFBVVCxQT1NULERFTEVURSxQQVRDSFwiXG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgaGVhZGVycyJdfQ==