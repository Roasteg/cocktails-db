FROM node:18

RUN npm i -g vite

COPY package*.json ./

RUN yarn

WORKDIR /app

COPY . .

ENV PORT=5173

EXPOSE 5173

CMD ["vite", "--host"]