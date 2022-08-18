FROM node:12.13.1-alpine
COPY . /opt/sofie-portal
WORKDIR /opt/sofie-portal
EXPOSE 3000/tcp
EXPOSE 3000/udp
CMD ["yarn", "start"]
