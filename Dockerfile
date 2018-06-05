FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4444

RUN apt-get update
RUN DEBIAN_FRONTEND=noninteractive apt-get --yes --force-yes install mysql-server

CMD /etc/init.d/mysqld start && npm run start:prod