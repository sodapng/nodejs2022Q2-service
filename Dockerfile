FROM node:lts-alpine As dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev"]
