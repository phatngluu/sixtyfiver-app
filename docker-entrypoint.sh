#!/usr/bin/env sh
set -eu
envsubst '${NGINX_PORT} ${PETHERNET_HOST} ${PETHERNET_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf
exec "$@"
