FROM node:20-alpine

WORKDIR /packages/langua_api_gateway

COPY package*.json .

RUN npm ci

COPY . .

COPY ./dist ./dist

COPY ./proto ../langua_proto/proto

ENTRYPOINT npm run start
