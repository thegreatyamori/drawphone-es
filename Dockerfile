FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install

COPY . .

RUN npm run build:prod

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "--experimental-json-modules", "./server/bin/www.js"]
