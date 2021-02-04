FROM node:15.8.0
EXPOSE 8080
WORKDIR /tasty-avocado/calendify
COPY package.json package.json
RUN npm install
COPY app.js app.js
CMD ["node", "app.js"]