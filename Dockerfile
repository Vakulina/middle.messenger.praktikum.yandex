FROM node:18.12.1

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server.js
