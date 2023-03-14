FROM node:16.17.0

COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD node server.js
