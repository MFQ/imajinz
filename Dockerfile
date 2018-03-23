#################################
#	DOCKER FILE for Node APP
#################################

FROM node:8.9-alpine
MAINTAINER Muhammad Fazil Qureshi<softmfq@gmail.com>
WORKDIR /app
COPY . /app
RUN npm install --production --silent
RUN npm install pm2 -g
RUN npm install sequelize-cli -g
