FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

RUN npm lint

CMD npm run start:prod