FROM node:6
# replace this with your application's default port
EXPOSE 8888
EXPOSE 4000

WORKDIR /app/code

ENV NODE_PATH=/usr/local/lib/node_modules/
ENV NODE_ENV=staging
ENV NODE_PROJECT=cms,fivestar_myanmar
RUN npm config set cache /node_modules/ --global


CMD "/bin/bash" 