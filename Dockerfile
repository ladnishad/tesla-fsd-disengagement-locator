FROM node:16-alpine

WORKDIR /app

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 8082

CMD ["npm", "run", "start"]
