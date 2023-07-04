# This is the base dockerfile. Here the base image is pulled and the ras setup is done for the project.
# Make sure to include the base setup for lerna here.
FROM node:20-alpine as base
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./lerna.json ./
# Package langua_proto
FROM base as langua_proto-build
WORKDIR /app/packages/langua_proto
# Here the dependencies will be installed and the local required packages bootstrapped.
# The --slim flag will cause the package json to only include the dependencies, so not all changes to the package json cause docker to reinstall all packages.
COPY  packages/langua_proto/package-slim.json package.json
WORKDIR /app/
RUN npx lerna bootstrap --scope=langua_proto --includeDependencies
WORKDIR /app/packages/langua_proto
# The normal package.json should be copied after the install into the container
COPY  packages/langua_proto/package.json ./
# This will only add the command to the dockerfile if the build script exists in the package otherwise its ignored.
# Package user_microservice
FROM node:20-alpine as user_microservice-0
WORKDIR /app/packages/user_microservice

WORKDIR /packages/user_microservice

COPY  packages/user_microservice/package*.json packages/user_microservice 

WORKDIR /app/
COPY --from=langua_proto-build /app/packages/langua_proto/package.json /app/packages/langua_proto/
RUN npx lerna bootstrap --scope=user_microservice --includeDependencies --ci
COPY --from=langua_proto-build /app/packages/langua_proto/ /app/packages/langua_proto/
WORKDIR /app/packages/user_microservice

COPY  packages/user_microservice packages/user_microservice 

COPY  packages/user_microservice/dist packages/user_microservice/dist 

ENTRYPOINT npm run start
# Package user-stats_microservice
FROM node:20-alpine as user-stats_microservice-0
WORKDIR /app/packages/user-stats_microservice

WORKDIR /packages/user-stats_microservice

COPY  packages/user-stats_microservice/package*.json packages/user-stats_microservice 

WORKDIR /app/
COPY --from=langua_proto-build /app/packages/langua_proto/package.json /app/packages/langua_proto/
RUN npx lerna bootstrap --scope=user-stats_microservice --includeDependencies --ci
COPY --from=langua_proto-build /app/packages/langua_proto/ /app/packages/langua_proto/
WORKDIR /app/packages/user-stats_microservice

COPY  packages/user-stats_microservice packages/user-stats_microservice 

COPY  packages/user-stats_microservice/dist packages/user-stats_microservice/dist 

ENTRYPOINT npm run start
# Package lexic_microservice
FROM node:20-alpine as lexic_microservice-0
WORKDIR /app/packages/lexic_microservice

WORKDIR /packages/lexic_microservice

COPY  packages/lexic_microservice/package*.json packages/lexic_microservice 

WORKDIR /app/
COPY --from=langua_proto-build /app/packages/langua_proto/package.json /app/packages/langua_proto/
RUN npx lerna bootstrap --scope=lexic_microservice --includeDependencies --ci
COPY --from=langua_proto-build /app/packages/langua_proto/ /app/packages/langua_proto/
WORKDIR /app/packages/lexic_microservice

COPY  packages/lexic_microservice packages/lexic_microservice 

COPY  packages/lexic_microservice/dist packages/lexic_microservice/dist 

ENTRYPOINT npm run start
# Package material_microservice
FROM node:20-alpine as material_microservice-0
WORKDIR /app/packages/material_microservice

WORKDIR /packages/material_microservice

COPY  packages/material_microservice/package*.json packages/material_microservice 

WORKDIR /app/
COPY --from=langua_proto-build /app/packages/langua_proto/package.json /app/packages/langua_proto/
RUN npx lerna bootstrap --scope=material_microservice --includeDependencies --ci
COPY --from=langua_proto-build /app/packages/langua_proto/ /app/packages/langua_proto/
WORKDIR /app/packages/material_microservice

COPY  packages/material_microservice packages/material_microservice 

COPY  packages/material_microservice/dist packages/material_microservice/dist 

ENTRYPOINT npm run start
# final stage
FROM base
COPY --from=langua_proto-build /app/packages/langua_proto /app/packages/langua_proto
COPY --from=user_microservice-0 /app/packages/user_microservice /app/packages/user_microservice
COPY --from=user-stats_microservice-0 /app/packages/user-stats_microservice /app/packages/user-stats_microservice
COPY --from=lexic_microservice-0 /app/packages/lexic_microservice /app/packages/lexic_microservice
COPY --from=material_microservice-0 /app/packages/material_microservice /app/packages/material_microservice