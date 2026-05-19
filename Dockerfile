FROM node:24-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY src ./src
COPY public ./public

RUN npm run build

FROM node:24-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
ENV CACHE_TTL=PT5M

EXPOSE 1455
CMD ["node", "dist/server.js"]