# Use the official Node.js image.
FROM node:20

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the React application.
RUN npm run build

# Install a simple static file server.
RUN npm install -g serve

# Run the web service on container startup.
CMD ["serve", "-s", "build"]

# Inform Docker that the container listens on port 5000.
EXPOSE 5000
