FROM node:6.14 as builder
RUN pwd
RUN mkdir /coda

COPY . /coda/
COPY package*.json /coda/

WORKDIR /coda

#RUN npm install --global typescript
#RUN echo "install done"
#RUN npm install --force && npm run build

FROM nginx:alpine
ENV DOCKERIZE_VERSION v0.2.0
RUN apk update && apk add bash ca-certificates curl && \
   curl -sSLf -o /tmp/dockerize.tar.gz https://github.com/jwilder/dockerize/releases/download/${DOCKERIZE_VERSION}/dockerize-linux-amd64-${DOCKERIZE_VERSION}.tar.gz && \
   tar -C /usr/local/bin -xzf /tmp/dockerize.tar.gz && \
   rm /tmp/dockerize.tar.gz
WORKDIR /usr/share/nginx/html

COPY --from=builder /coda/dist .

RUN mkdir /temp
COPY ./nginx.conf.template /temp
#COPY ./nginx.conf.template /etc/nginx/nginx.conf
COPY ./entrypoint.sh /temp
RUN chmod +x /temp/entrypoint.sh
RUN echo "daemon off;" /etc/nginx/nginx.conf
ENTRYPOINT ["/temp/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]

EXPOSE 80
