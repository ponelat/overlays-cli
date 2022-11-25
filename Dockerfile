FROM node:14.21.1-alpine

WORKDIR /

COPY . .

RUN npm install 

CMD cat overlay.yaml | node bin.js