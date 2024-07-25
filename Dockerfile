FROM node:22.5.1-alpine AS development

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

RUN mkdir /opt/app
WORKDIR /opt/app
ENV PATH /opt/app/.bin:$PATH
COPY ./app/package.json ./app/package-lock.json ./
RUN npm install

WORKDIR /opt/app/app

COPY ./app .

ENTRYPOINT ["npm", "run"]
CMD ["web"]