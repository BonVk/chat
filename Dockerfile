FROM node:16.15.0-alpine3.15

EXPOSE 3000

WORKDIR /app
COPY package.json /app/
COPY package-lock.json /app/

RUN npm ci
COPY . /app

CMD npm start
