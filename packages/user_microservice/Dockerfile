FROM node:20-alpine

WORKDIR /packages/user_microservice

COPY package*.json .

RUN npm ci

COPY . .

COPY ./dist ./dist

COPY ./proto ../langua_proto/proto

ENTRYPOINT npm run start
