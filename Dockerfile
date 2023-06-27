FROM node:16 as build

ARG VERSION_INFO=DEV

WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install 
COPY . ./
RUN npm run build

# final stage
FROM node:16

LABEL maintainer="bmswens@gmail.com"
EXPOSE 5000

WORKDIR /app

COPY --from=build /app/build ./build
RUN npm install -g serve

ENTRYPOINT ["serve", "-s", "build"]