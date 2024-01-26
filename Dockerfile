FROM node:17.3.0

ENV DATABASE_URL=mongodb+srv://schizzle27:arHfmWmCwSEo1ixs@rivia.8npxslx.mongodb.net/testDatabase JWT_SECRET=temporary_but_VERY_secret

# This instructs Docker to use this path as the default location for all subsequent commands
WORKDIR /app

# Copy package info from outside of the container into the container
COPY package.json package.json
COPY package-lock.json package-lock.json

# NPM install in the container
RUN npm install

# Copies all files from the current directory into the container
COPY . .

# The command to run to start the code inside the container
CMD [ "npm", "start" ]