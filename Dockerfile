FROM --platform=linux/amd64 node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json first to leverage Docker caching
COPY ./app .

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 3000

# Command to start the application
CMD ["node", "index.js"]