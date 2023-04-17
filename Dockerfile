FROM node:16-alpine

WORKDIR /app

COPY package*.json /app

COPY . .

RUN npm install --silent