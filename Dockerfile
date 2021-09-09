FROM node:alpine3.12

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

RUN npm install 

ENV PORT=80

EXPOSE 80

CMD npm run buildAndStart