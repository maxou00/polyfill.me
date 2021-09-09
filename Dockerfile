FROM node:alpine3.12

RUN mkdir -p /usr/app

WORKDIR /usr/app

COPY . .

RUN npm install 

RUN ls

ENV PORT=80

EXPOSE 80

CMD npm run build && npm run start