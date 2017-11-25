FROM node:8
# Bundle APP files
RUN mkdir -p /server
WORKDIR /server
ADD . .
RUN mkdir log && touch log/app.log
# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install
RUN ls -la /server

CMD [ "npm", "start:prod" ]
