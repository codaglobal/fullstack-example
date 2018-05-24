# FullstackExampleBackend

## Development server

Run `npm run start-dev` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## Start

Run `npm start` to build the project.

## Running unit tests
Run `npm test` to execute the unit tests via [Gulp](https://gulpjs.com/).

## Run as docker container
Run `npm test` to execute the unit tests via [Gulp](https://gulpjs.com/).
Docker needs one build argument (`web_domain`) for backend configuration.
`web_domain` - frontend domain.
so, docker build command looks like this
`docker build --build-arg web_domain=${web_domain} --tag ${IMAGE_NAME_BACKEND} .`