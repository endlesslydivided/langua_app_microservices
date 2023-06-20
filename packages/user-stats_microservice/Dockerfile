FROM node:20-alpine

WORKDIR /packages/user-stats_microservice

COPY package*.json .

RUN npm install

RUN npm ci

COPY . .

COPY ./dist ./dist

ENTRYPOINT npm run start
