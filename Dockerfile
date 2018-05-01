FROM node:6.14

RUN mkdir /coda

COPY app/ /coda/app/
COPY config/ /coda/config/
COPY package*.json /coda/

WORKDIR /coda

RUN npm install --only=production

EXPOSE 3000

CMD [ "npm", "start" ]