FROM node:6

MAINTAINER acdcjunior

RUN rm -rf /app
RUN mkdir -p /app
WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /usr/src/app

RUN npm run build:prod
