FROM node:16

# Create api directory
WORKDIR /api

# Install app dependencies
COPY package*.json ./

RUN npm install
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 4000
CMD [ "node", "server.js" ]