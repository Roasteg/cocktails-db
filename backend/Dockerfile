FROM node:16

WORKDIR /src

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 8000

CMD ["yarn", "dev"]