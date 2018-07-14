FROM node:8.9-slim

ENV PORT 8080
ENV NODE_ENV prod

ARG NPM_TOKEN

# npm install
ADD package.json /tmp/package.json
COPY .npmrc /tmp/.npmrc

RUN printf "\n//npm-server.paas.axa-asia.com/:_authToken=\${NPM_TOKEN}" >> /tmp/.npmrc
RUN cd /tmp && npm install
RUN rm -f /tmp/.npmrc

# - added mkdir because OS@RDC doesn't seem to create it upon WORKDIR
RUN mkdir -p /opt/app-root/ && cp -a /tmp/node_modules /opt/app-root/

# prepare app
WORKDIR /opt/app-root/
COPY . .

# build app
RUN npm run build
RUN chmod -R 775 .

EXPOSE 8080

# entry point
CMD ["npm", "start"]
