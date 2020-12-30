FROM node

COPY . /root/

WORKDIR /root/

RUN npm install \
    && npm run serve
