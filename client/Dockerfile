FROM node

# install npm (in separate dir due to docker cache)
ADD package.json /tmp/npm_inst/package.json
RUN cd /tmp/npm_inst &&\
    npm install &&\
    mkdir -p /tmp/app &&\
    mv /tmp/npm_inst/node_modules /tmp/app/

# build and publish application
ADD . /tmp/app
RUN cd /tmp/app &&\
    npm build:aot:prod &&\
    mv ./dist/* /usr/share/nginx/html/

# clean
RUN rm -Rf /tmp/npm_inst &&\
    rm -Rf /tmp/app &&\
    rm -Rf /root/.npm &&\
    apk del nodejs
