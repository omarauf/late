# FROM node:latest

# # Create app directory
# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# # Copy package.json
# COPY package.json /usr/src/app

# # Install node_modules
# RUN npm install

# # Copy files
# COPY . /usr/src/app

# -----------------------------------------------------------

# Name the node stage "builder"
FROM node:alpine
# Set working directory
WORKDIR /app
# Install app dependencies
# // A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package.json ./
# install node modules
RUN yarn install
# Copy all files from current directory to working dir in image
COPY . .
# build assets
CMD [ "yarn", "dev"]