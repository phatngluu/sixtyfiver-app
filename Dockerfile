# Stage 1: Compile and Build angular codebase
FROM node:latest as build
RUN npm -g install npm@6.14.14

WORKDIR /usr/local/app

# Copy all files to the container
COPY . /usr/local/app/
RUN npm install

# Build the application as production, output in dist
RUN npm run build --configuration=production

# Clean up after build
RUN mv dist /tmp/
RUN rm * -rf
RUN mv /tmp/dist .
