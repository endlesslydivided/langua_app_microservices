FROM node:20-alpine

WORKDIR /packages/material_microservice

COPY package*.json .

RUN npm install

RUN npm ci

COPY . .

COPY ./dist ./dist

ENTRYPOINT npm run start
