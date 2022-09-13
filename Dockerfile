# Get Node 18 alpine
FROM node:18-alpine

# Set the working directory, so that each following command will execute from that directory
WORKDIR /app

# Copy all files to our working directory
COPY . .

# Install and build the Node app
RUN npm i
RUN npm run build --omit=dev

# Run the Angular web app
CMD ["npm", "run", "ng", "serve"]

# Expose the host port 7000 to the docker container port
EXPOSE 7000:4200
