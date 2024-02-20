FROM node:latest
WORKDIR /app
ADD ./node /app
VOLUME /static
RUN npm install
ENTRYPOINT ["node", "server.js"]
EXPOSE 3000
