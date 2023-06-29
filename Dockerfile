FROM node:20-alpine as build
LABEL authors="ericvsolcruz"

RUN npm install -g pnpm

MKDIR app
WORKDIR ./app

COPY ./package.json ./package.json

RUN pnpm install

RUN vite build

FROM nginx:stable-alpine-slim
ENV VITE_BACKEND_URL=0.0.0.0:8000

RUN apt-get update \
    && apt-get install -y ca-certificates tzdata \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 80

ENV TZ=Etc/UTC APP_USER=appuser

RUN groupadd $APP_USER \
    && useradd -g $APP_USER $APP_USER \
    && mkdir -p ${APP}

COPY --from=build /app/dist /app

WORKDIR /app

COPY . /usr/share/nginx/html
