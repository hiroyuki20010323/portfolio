FROM node:18-alpine

RUN apk add --no-cache openssl

RUN mkdir /src

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npm","run","dev"]