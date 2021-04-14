# Duda Instant Sites Demo

The Duda instant sites demo environment is a cloud-hosted web app demonstrating different instant site implementations and use-cases. It has a create-react-app frontend built with material-ui which is hosted on S3, backed by Cloudfront. An authenticated Lambda-based interface to Duda's APIs is also provided. Feel free to clone the repo and test it out yourself. 

## Prerequisites

Before getting started with this demo environment, you're going to need:

* Access to a production Duda account.
* [AWS command line tools](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed & configured. 
* [jq](https://stedolan.github.io/jq/download/), a handy command line tool for parsing JSON. 

## Useful commands

 * `./configure`   check dependencies and set up environment variables
 * `./build`   compile infrastructure typescript and print cdk diff
 * `./deploy`    deploy infrastructure and react app to aws