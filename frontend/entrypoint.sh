#!/bin/sh

# Substitute environment variables in the nginx config template
envsubst '${API_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/conf.d/default.conf

# Start nginx in the foreground
nginx -g 'daemon off;'
