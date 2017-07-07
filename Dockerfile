FROM node:6

MAINTAINER acdcjunior

RUN npm install -g firebase-tools
RUN npm install -g cordova ionic

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app

RUN npm run build:prod
