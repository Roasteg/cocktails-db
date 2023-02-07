FROM node:lts-alpine

COPY package*.json ./

RUN yarn

WORKDIR /app

COPY . .

EXPOSE 5173

CMD ["yarn", "dev"]