##Hello World Application with AWS ECS Fargate

This project demonstrates how to build, test, containerize, and deploy a simple Hello World Node.js web application on AWS ECS Fargate using AWS CDK.

Prerequisites

Before you begin, ensure you have the following installed:
• Node.js (version 16 or later)
• AWS CLI (configured with appropriate credentials)
• Docker
• CDK CLI (installed globally via npm install -g aws-cdk)
• An AWS account and an active VPC in your region.

Step-by-Step Guide

Step 1: Test the Application Locally 1. Navigate to the application directory:

cd app

    2.	Install dependencies:

npm install

    3.	Run the application locally:

node index.js

    4.	Open your browser and go to:

http://localhost:3000

You should see “Hello, World!” displayed.

Step 2: Containerize the Application 1. Go back to the project root directory:

cd ..

    2.	Build the Docker image:

docker build -t hello-world-app .

    3.	Run the Docker container locally to verify it works:

docker run -p 3000:3000 hello-world-app

    4.	Open your browser and go to:

http://localhost:3000

You should see “Hello, World!” displayed again.

Step 3: Push the Docker Image to AWS ECR

Step 4: Deploy the Application to AWS ECS Fargate 1. Deploy the CDK stack:

cdk deploy

    2.	During deployment, CDK will:
    •	Create an ECS Fargate Cluster.
    •	Define a Task Definition with your Docker image.
    •	Deploy a Load Balancer to expose your application.
    3.	Once deployed, check the CDK Output for the Load Balancer DNS.

Step 5: Access the Application 1. Copy the Load Balancer DNS from the CDK deployment output. 2. Open your browser and go to:

http://<LoadBalancerDNS>

    3.	You should see “Hello, World!” displayed.

Step 6: Clean Up

To avoid incurring unnecessary AWS costs, destroy the stack when you’re done:

cdk destroy

Project Overview

Folder Structure

.
├── app/ # Application code
│ ├── index.js # Node.js application entry point
│ ├── package.json # Dependencies
├── lib/
│ └── hello-world-stack.ts # CDK stack definition
├── Dockerfile # Dockerfile for containerizing the app
├── cdk.json # CDK configuration file
└── README.md # This file

Useful Commands

Command Description
npm run build Compile TypeScript to JavaScript
npm run watch Watch for changes and compile
npm run test Perform the Jest unit tests
npx cdk deploy Deploy this stack to your default AWS account/region
npx cdk diff Compare deployed stack with the current state
npx cdk synth Emit the synthesized CloudFormation template
