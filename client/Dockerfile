FROM node:8-alpine as client
ADD package.json .
RUN npm install && mkdir -p /app && cp -R ./node_modules /app
WORKDIR /app
COPY . .
RUN npm run build:aot:prod

FROM nginx:1.13.3-alpine
COPY nginx/default.conf /etc/nginx/conf.d/
RUN rm -rf /usr/share/nginx/html/*
COPY --from=client /app/dist /usr/share/nginx/html
ADD ssl_cert.* /usr/share/nginx/
CMD ["nginx", "-g", "daemon off;"]
