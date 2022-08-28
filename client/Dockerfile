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