FROM node:6.14

RUN mkdir /coda
ARG web_domain
ARG MONGODB_HOST
ARG MONGODB_PORT
ENV MONGODB_HOST=${MONGODB_HOST} MONGODB_PORT=${MONGODB_PORT} web_domain=${web_domain}
COPY app/ /coda/app/
COPY config/ /coda/config/
COPY package*.json /coda/

WORKDIR /coda

RUN npm install --only=production

EXPOSE 3000

CMD [ "npm", "start" ]