# Duda Instant Site Demo

The Duda instant site demo environment is a cloud-hosted web app demonstrating different instant site implementations and use-cases. It has a create-react-app frontend built with material-ui which is hosted on S3, backed by Cloudfront. An authenticated Lambda-based interface to Duda's APIs is also provided. Feel free to clone the repo and test it out yourself. 

## Useful commands

 * `./configure`   check dependencies and set up environment variables
 * `./build`   compile infrastructure typescript and print cdk diff
 * `./deploy`    deploy infrastructure and react app to aws

## Getting started

### Prerequisites

Before getting started with this demo environment, you're going to need:

* Access to a production Duda account.
* [AWS command line tools](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) installed & configured. 
* [jq](https://stedolan.github.io/jq/download/), a handy command line tool for parsing JSON. 

First start by cloning the repository:

```
git clone git@github.com:DudaDev/duda-instant-site-demo.git
```

Next, change into the directory and configure your environment:

```
cd duda-instant-site-demo
./configure
```

The configure script will ask you for your API credentials and to create a user name. The user name will be used to log into the demo environment after it's deployed.

```
We need to set up your environment variables (./app/.env):

Enter your Duda API Username: n4hjs42ns
Enter your Duda API Password: fjs124r2  

Now let's create an account to access the demo environment:

Enter a username: admin
Your temporary password is: V2VkIDE0IEFwciAyMDIxIDEyOjAwOjAxIFBNIE1EVAo=

Save your temporary password and press enter to continue.

Demo environment configured. Try ./build
```

Now that you are all configured, run `./build` and then `./deploy`. The deploy script will print the URL of the demo environment when it's finished.
