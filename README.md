# Overview

Coda Global's Full Stack Example Application

Use this application for testing or demo purposes.

## Using

It is suggested that if you are going to use minikube for the demo that you create a hosts file entry to provide a name "k8s.demo" that will resolve to your minikube cluster.

## Project Structure
  - backend
    - app/
    - config/
    - test/
    - Dockerfile
    - package.json

  - webui
    - src/
    - Dockerfile
    - entrypoint.sh
    - nginx.conf.template
    - package.json

  - Charts
    - mongodb/
    - movie-api/
    - movie-ui/

## Prerequisites

- Install Virtualbox
- Install Minikube - https://kubernetes.io/docs/tasks/tools/install-minikube/
- Install Kubectl - https://kubernetes.io/docs/tasks/tools/install-kubectl/

Executing `minikube start` should start the cluster.


## Run this app locally
- Clone this repo
- Start a mongodb somewhere

To run the backend in node locally or on a linux vm:
- Modify /config/database.config.js to reflect location of mongodb
- Issue `npm install` to install node_modules.
- Issue `npm start-dev`
- Open a browser, and point to <http://localhost:3000>

To run the webui locally:
- Issue `npm install` to install node_modules.
- Issue `npm start`
- Open a browser, and point to <http://localhost:4200>


## Run this app on k8s

- Validate the values.yaml in Charts/mongodb
- Install the stable mongodb chart, using the values.yaml in Charts/mongodb
  `cd Charts/mongodb`
  `helm install --name fs-demo-db -f values.yaml stable/mongodb`
- Update the values.yaml in Charts/movie-api, specifically
  - config.mongo_host (this should match the service name.namespace created by the mongodb deployment - EX fs-demo-db-mongodb.default)
  - config.mongo_port (this should match the service port created by the mongodb deployment)

- NOTE: The helm chart pulls an docker image from the repository mentioned in `values.yaml`. To run backend and webui on k8s, you need to have docker images ready.
    ## To create backend image
      - `eval $(minikube docker-env)` - To talk to docker daemon from minikube
      - `cd backend`
      - `docker build -t demo-app-service .`

    ## To create webui image
      - `eval $(minikube docker-env)` - To talk to docker daemon from minikube
      - `cd webui`
      - `docker build -t demo-app-ui .`  

- Install the backend chart
  `cd Charts/movie-api`
  `helm install --name fs-demo-api .`

- Install the webui chart
  `cd Charts/movie-ui`
  `helm install --name fs-demo-ui .`

## ToDo

- DONE: Place app into container(s)
- DONE: Update DB config to use env variables
- DONE: Update testing to use containers (node app & mongodb)
- DONE: Orchestrate app with kubernetes
- DONE: (k8s only) Move the API from / to /api or something
  - DONE: update helm chart / ingress
- Create UI
  - DONE: deploy in container, expose ip to access from outside
  - leverage BDD pattern if possible so there are automated tests for FR as well
- Create dummy data set and populate DB for demo purposes
- Expand unit test coverage to 100%
- Create E2E tests and automate running
- Consider how to also automate testing the k8s orchestration
  - at least helm lint the chart(s)?
  - maybe use Cloudify or 'minikube in Travis' to do E2E testing and include helm chart?
- DONE: Eliminate Env Vars in travis file(s)
- DONE: Automate version increment instead of env var for version number
