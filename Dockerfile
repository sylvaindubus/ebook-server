FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY src/styles/tailwind.css ./src/styles/tailwind.css
COPY src ./src

RUN npm run build

EXPOSE 1455
CMD ["npm", "start"]