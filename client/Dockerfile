FROM node:alpine
# Set working directory
WORKDIR /app
# Copy app dependencies
COPY package.json ./
COPY yarn.lock ./
# Install app dependencies 
RUN yarn install
# Copy all files from current directory to working dir in image
COPY . .
# build assets
CMD [ "yarn", "dev"]