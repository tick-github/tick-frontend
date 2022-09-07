# 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build --prod

# 2
FROM nginx:alpine
COPY --from=node /app/dist/tick-frontend /usr/share/nginx/html

EXPOSE 4200:80
