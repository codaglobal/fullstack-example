FROM node:8.16.0

RUN mkdir /coda
ARG web_domain
ARG MONGODB_HOST
ARG MONGODB_PORT
ENV MONGODB_HOST=${MONGODB_HOST} MONGODB_PORT=${MONGODB_PORT} web_domain=${web_domain}
COPY app/ /coda/app/
COPY config/ /coda/config/
COPY package*.json /coda/
COPY wait-for-it.sh /coda/

WORKDIR /coda

RUN npm install --only=production

EXPOSE 3000

CMD [ "npm", "start" ]