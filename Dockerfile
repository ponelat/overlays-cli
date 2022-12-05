FROM node:18-alpine

RUN mkdir /overlays && mkdir /src
COPY . ./src

RUN cd /src && npm ci

WORKDIR /overlays

CMD ["/src/bin.js"]
