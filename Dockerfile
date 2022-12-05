FROM node:18-alpine

RUN mkdir /src
COPY . ./src
WORKDIR /src

RUN npm ci

CMD ["/src/bin.js"]
