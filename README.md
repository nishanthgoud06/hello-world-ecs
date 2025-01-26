# Hello World Application with AWS ECS Fargate

This project demonstrates how to build, test, containerize, and deploy a simple Hello World Node.js web application on AWS ECS Fargate using AWS CDK.

## Prerequisites

Before you begin, ensure you have the following installed:
• Node.js (version 16 or later)
• AWS CLI (configured with appropriate credentials)
• Docker
• CDK CLI (installed globally via npm install -g aws-cdk)
• An AWS account and an active VPC in your region.

Step-by-Step Guide

Step 1: Test the Application Locally 1. Navigate to the application directory:
```
cd app

npm install

node index.js
```

http://localhost:3000

You should see “Hello, World!” displayed.

Step 2: Containerize the Application 1. Go back to the project root directory:
```
cd ..
docker build -t hello-world-app .
docker run -p 3000:3000 hello-world-app
```
http://localhost:3000

You should see “Hello, World!” displayed again.

Step 3: Push the Docker Image to AWS ECR

Step 4: Deploy the Application to AWS ECS Fargate 1. Deploy the CDK stack:

cdk deploy

Step 5: Access the Application 1. Copy the Load Balancer DNS from the CDK deployment output. 2. Open your browser and go to:

http://<LoadBalancerDNS>

You should see “Hello, World!” displayed.

Step 6: Clean Up

To avoid incurring unnecessary AWS costs, destroy the stack when you’re done:

cdk destroy

Useful Commands

Command Description
```
npm run build Compile TypeScript to JavaScript
npm run watch Watch for changes and compile
npm run test Perform the Jest unit tests
npx cdk deploy Deploy this stack to your default AWS account/region
npx cdk diff Compare deployed stack with the current state
npx cdk synth Emit the synthesized CloudFormation template
```
