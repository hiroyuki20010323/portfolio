FROM node:18-alpine

RUN apk add --no-cache openssl
# これにより、alpineのopensslパッケージをinstallする、https通信を実行する際に必要になる

RUN mkdir /src

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npx prisma migrate dev

CMD ["npm","run","dev"]