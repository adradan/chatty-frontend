FROM node:20-alpine as build
LABEL authors="ericvsolcruz"

RUN npm install -g pnpm

WORKDIR ./app

COPY . .

RUN pnpm install

RUN pnpm build

FROM nginx:stable-alpine-slim
ENV VITE_BACKEND_URL=0.0.0.0:8000

EXPOSE 80

ENV TZ=Etc/UTC

COPY --from=build /app/dist /app

WORKDIR /app

COPY . /usr/share/nginx/html
