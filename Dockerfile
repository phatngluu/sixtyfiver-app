# Stage 1: Compile and Build angular codebase
FROM node:latest as build
RUN npm -g install npm@6.14.14

WORKDIR /usr/local/app
COPY . /usr/local/app/
RUN npm install
RUN npm run build

# Stage 2: Serve app with nginx server
FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/local/app/dist/sixtyfiver-app /usr/share/nginx/html
# Override default.conf
COPY --from=build /usr/local/app/nginx/default.conf.template /etc/nginx/conf.d/default.conf.template

COPY docker-entrypoint.sh /
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
