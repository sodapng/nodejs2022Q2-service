FROM node:lts-alpine As dev
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run prisma:generate
EXPOSE ${PORT}
CMD [ "npm", "run", "start:dev"]
