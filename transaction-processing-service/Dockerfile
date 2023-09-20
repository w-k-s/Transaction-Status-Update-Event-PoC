# Use the official Node.js image with the desired version
FROM node:20.7.0

# Install Yarn globally with the desired version
#RUN npm install -g yarn@1.22.19

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json yarn.lock ./

# Install project dependencies using Yarn
RUN yarn install

# Copy the rest of the application code to the container
COPY . .

# Expose the port your NestJS application will run on (replace with your app's port)
EXPOSE 3000

# Start your NestJS application
CMD ["yarn", "start"]