# Stage 1: Frontend assets
FROM nginx:stable-alpine

# Install gettext for envsubst
RUN apk --no-cache add gettext

# Copy frontend files
COPY . /usr/share/nginx/html

# Copy the Nginx config template and the entrypoint script
COPY nginx.conf.template /etc/nginx/nginx.conf.template
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint
ENTRYPOINT ["/entrypoint.sh"]

# Expose port 80
EXPOSE 80
