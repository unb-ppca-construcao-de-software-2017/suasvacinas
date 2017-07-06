FROM node:8.1.2

MAINTAINER acdcjunior

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /usr/src/app

RUN npm run build:prod
