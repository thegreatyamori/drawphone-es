FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev || npm install

COPY . .

RUN npm run build:prod

EXPOSE 5555

ENV NODE_ENV=production
ENV PORT=5555

CMD ["node", "--experimental-json-modules", "./server/bin/www.js"]
