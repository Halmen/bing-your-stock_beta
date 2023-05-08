FROM node:18-alpine AS deps

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000

CMD npm run dev

