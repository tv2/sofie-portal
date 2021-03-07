FROM node:12.13.1-alpine
COPY . /opt/tv2-sofie-portal
WORKDIR /opt/tv2-sofie-portal
EXPOSE 3000/tcp
EXPOSE 3000/udp
CMD ["yarn", "start-docker"]
