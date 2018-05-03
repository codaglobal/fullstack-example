# Overview

Coda Global's Full Stack Example Application

Use this application for testing or demo purposes.

## Using

- Clone this repo
- Start a mongodb somewhere
- Modify /config/database.config.js to reflect location of mongodb
- Issue `npm install`
- Open a browser, and point to <http://localhost:3000>

To use with k8s:

- Validate the values.yaml in Charts/mongodb
- Install the stable mongodb chart, using the values.yaml in Charts/mongodb
  `cd Charts/mongodb`
  `helm install --name fs-demo-db -f values.yaml stable/mongodb`
- Update the values.yaml in Charts/movie-api, specifically
  - config.mongo_host (this should match the service name.namespace created by the mongodb deployment - EX fs-demo-db-mongodb.default)
  - config.mongo_port (this should match the service port created by the mongodb deployment)
- Install the api chart
  `cd Charts/movie-api`
  `helm install --name fs-demo-api .`

## ToDo

- DONE: Place app into container(s)
- DONE: Update DB config to use env variables
- DONE: Update testing to use containers (node app & mongodb)
- DONE: Orchestrate app with kubernetes
- Expand unit test coverage to 100%
- Create UI
- Create E2E tests and automate running
- Create dummy data set and populate DB for demo purposes