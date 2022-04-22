FROM node:alpine
MAINTAINER daniel@lightfeather.io
EXPOSE 8080
WORKDIR /home/node
COPY package.json .
RUN npm install
COPY *.js .
ENTRYPOINT ["node", "index.js"]
