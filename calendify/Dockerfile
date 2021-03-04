FROM node:15.8.0
EXPOSE 8080
WORKDIR /calendify
COPY package.json package.json
RUN npm install
COPY src src
CMD npm run start