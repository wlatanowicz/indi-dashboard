FROM node:8-alpine AS build

RUN apk add --update \
  git \
  && rm -rf /var/cache/apk/*

WORKDIR /workdir

ADD package.json .
RUN npm install
RUN ln -s node_modules/tomek.js/compiler \
 && ln -s node_modules/tomek.js/framework \
 && mkdir tmp

ADD app ./app
ADD gulpfile.js .
ADD tsconfig.json .

RUN ./node_modules/.bin/gulp build

FROM nginx:1.15-alpine

COPY --from=build /workdir/build /usr/share/nginx/html


