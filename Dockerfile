FROM node:latest

WORKDIR /

COPY . .

RUN npm install 

CMD cat overlay.yaml | node bin.js