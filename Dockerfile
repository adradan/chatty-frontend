FROM node:20-alpine as build
LABEL authors="ericvsolcruz"

RUN npm install -g pnpm

WORKDIR /app

ENV VITE_BACKEND_URL=chatty.macksproductions.com/api

COPY . .

RUN rm -rf ./node_modules
RUN rm -rf ./.env

RUN pnpm install

RUN pnpm run build

FROM nginx:stable-alpine-slim

EXPOSE 3000

ENV TZ=Etc/UTC

ENV CACHEBUSTER=0

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html/


CMD ["nginx", "-g", "daemon off;"]
