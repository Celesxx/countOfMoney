FROM node:12.18.3

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./

RUN npm install
#RUN npm install --production

# Bundle app source
COPY . .

EXPOSE 3000

CMD ["npm", "start"]