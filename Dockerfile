# stage 1, build image

FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2, run on run image

FROM nginx:alpne
COPY --from=node /app/dist/tick-frontend /usr/share/nginx/html