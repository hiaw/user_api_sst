# User API

This repository contains code for creating a user API using [SST](https://sst.dev/). SST simplifies the deployment to AWS. The API is served using AWS API Gateway, run with AWS Lambda and using AWS RDS Database.

It uses [pnpm](https://pnpm.io/) as the package manager.

## Get started

Clone the repository and run

`pnpm install`

Install [aws-cli](https://aws.amazon.com/cli/) and ensure [you're logged in](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file) before working. Then you can run using

`npx sst dev`
