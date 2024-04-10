# User API

This repository contains code for creating a user API using [SST](https://sst.dev/). SST simplifies the deployment to AWS. The API is served using AWS API Gateway, run with AWS Lambda and using AWS RDS Database.

It uses [pnpm](https://pnpm.io/) as the package manager.

## Evaluation

A live version of this API is available [here](https://6nadkytg2f.execute-api.us-east-1.amazonaws.com) until end of April 2024.

## Usage

The following APIs are provided by this project

- POST /user
  - Create a user with `email`, `first_name`, `last_name` as JSON object in HTTP request body.
- GET /users
  - Returns all users including the `id`
- GET /user/{id}
  - Returns user with `id` if it exists
- GET /users/with_last_name/{last_name}
  - Returns all users with `last_name`. Case sensitive.

## Get started

### Development

Clone the repository and run

`pnpm install`

Install [aws-cli](https://aws.amazon.com/cli/) and ensure [you're logged in](https://docs.sst.dev/advanced/iam-credentials#loading-from-a-file) before working. Then you can run using

`npx sst dev`

### Deployment

The project assume low resource requirement for RDS PostgreSQL. The `minCapacity` in `stack/MyStack.ts` can be adjusted for higher requirement.

`npx sst deploy`

### Unit Test

`pnpm test` in either root directory or `package/functions/` directory.

### Clean up

Running `npx sst remove` will remove all the resources that was allocated in this project on AWS.
