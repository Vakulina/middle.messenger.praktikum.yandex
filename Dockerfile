FROM node:18.12.1

WORKDIR /app
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD node server.js
