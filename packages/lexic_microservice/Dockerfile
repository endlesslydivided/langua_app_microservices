FROM node:20-alpine

WORKDIR /packages/lexic_microservice

COPY package*.json .

RUN npm install

COPY . .

COPY ./dist ./dist

COPY ./proto ../langua_proto/proto

ENTRYPOINT npm run start
