FROM node:lts-alpine

WORKDIR /var/www/app

ENV NODE_ENV=production

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "./server.js"]
