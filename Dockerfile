FROM node:20-alpine as build
LABEL authors="ericvsolcruz"

RUN npm install -g pnpm

WORKDIR /app

COPY . .

RUN rm -rf ./node_modules

RUN pnpm install

RUN pnpm run build

FROM nginx:stable-alpine-slim
ENV VITE_BACKEND_URL=0.0.0.0:8000

EXPOSE 80

ENV TZ=Etc/UTC

ENV CACHEBUSTER=0

WORKDIR /app

COPY --from=build /app/dist/ /usr/share/nginx/html/


CMD ["nginx", "-g", "daemon off;"]