# Use Node.js image as base
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application
COPY . .

# Expose the port on which your Node.js app runs
EXPOSE 3001

# Command to run the Node.js application
CMD ["npm", "start"]
