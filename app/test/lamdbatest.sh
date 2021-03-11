#!/bin/bash
API_BASE='https://hwa1lbwd9i.execute-api.us-east-1.amazonaws.com/prod'
TEMPLATE_ID='1026287'
USERID='test-id-123'
HEADER_JSON="Content-Type:application/json"
DELAY=1

echo "Testing createSite..." &&
SITENAME=$(curl -s --request POST "$API_BASE/sites" \
     --header $HEADER_JSON \
     --data '{"templateId":"'$TEMPLATE_ID'"}' | jq -r .siteName) &&
echo "Created site: $SITENAME" &&
echo &&
sleep $DELAY

echo "Testing updatecontent with PUT..." &&
curl -s --request PUT $API_BASE/sites/$SITENAME \
     --header $HEADER_JSON \
     --data @testContent.json | jq -r .status &&
echo &&
sleep $DELAY

echo "Testing updatecontent with PATCH..." &&
curl -s --request PATCH $API_BASE/sites/$SITENAME \
     --header $HEADER_JSON \
     --data @testContent.json | jq -r .status &&
echo &&
sleep $DELAY

echo "Testing publishSite..." &&
curl -s --request POST $API_BASE/sites/$SITENAME/versions \
     --header $HEADER_JSON | jq -r .status &&
echo &&
sleep $DELAY

echo "Testing createUser..." &&
USERID=$(curl -s --request POST $API_BASE/users \
     --header $HEADER_JSON \
     --data '{"userId":"'$USERID'"}' | jq -r .userId) &&
echo "Created user: $USERID" &&
echo &&
sleep $DELAY

echo "Testing grantUserAccess..." &&
curl -s --request POST $API_BASE/users/$USERID/accessFor/$SITENAME \
     --header $HEADER_JSON | jq -r .status &&
echo &&
sleep $DELAY

echo "Testing getSSOLink..." &&
SSO=$(curl -s --request GET $API_BASE/users/$USERID/accessFor/$SITENAME \
     --header $HEADER_JSON | jq -r .url) &&
echo "SSO Link: $SSO" &&
echo &&

echo "Testing getSites..." &&
SITES=$(curl -s --request GET $API_BASE/sites \
     --header $HEADER_JSON) &&
echo $SITES &&
echo &&

echo "Cleaning up by testing deleteSite..." &&
curl -s --request DELETE $API_BASE/sites/$SITENAME \
     --header $HEADER_JSON | jq -r .status &&
echo

echo "Test completed."
echo