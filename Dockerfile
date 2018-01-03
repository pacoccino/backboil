FROM node:8.9.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install git
RUN git config --global url."https://".insteadOf git://
RUN npm config set loglevel warn
RUN npm i -g yarn
COPY package.json yarn.lock /usr/src/app/
RUN yarn install --non-interactive

ENV NODE_ENV=production

COPY . /usr/src/app
USER node
