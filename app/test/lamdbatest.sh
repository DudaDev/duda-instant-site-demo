USERID=test-id-123

# createSite
curl --request POST 'https://hwa1lbwd9i.execute-api.us-east-1.amazonaws.com/prod/sites' \
     --header "Content-Type: application/json" \
     --data '{"templateId":"1026287"}' | jq .siteName < $SITENAME &&
# {"siteName":"75630b84"}%

# createUser
curl --request POST 'https://hwa1lbwd9i.execute-api.us-east-1.amazonaws.com/prod/users' \
     --header "Content-Type: application/json" \
     --data '{"userId":"'$USERID'"}' | jq .userId < $USERID &&
#{"userId":"test-id-123"}%

# grantUserAccess
curl --request POST "https://hwa1lbwd9i.execute-api.us-east-1.amazonaws.com/prod/" \
     --header "Content-Type: application/json" \
     --data "{\"userId\":\"$USERID\"}"
