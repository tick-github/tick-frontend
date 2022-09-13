# Get Node 18 alpine
FROM node:18-alpine as build

# Set the working directory, so that each following command will execute from that directory
RUN mkdir -p /app
WORKDIR /app

COPY package.json .

# Install the Node dependencies
RUN npm i

# Copy all other files
COPY . .

# Build a production version of the web app
RUN npm run build --omit=dev

# Get Nginx
FROM nginx:alpine
COPY --from=build /app/dist/tick-frontend /usr/share/nginx/html