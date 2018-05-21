#!/bin/sh
echo "host name" $SERVICE_HOST
dockerize -template /temp/nginx.conf.template:/etc/nginx/nginx.conf
#Start Nginx
exec "$@"