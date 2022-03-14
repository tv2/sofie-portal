# BUILD IMAGE
FROM node:16.14-alpine
WORKDIR /opt/sofie-portal
COPY . .
RUN yarn --check-files --frozen-lockfile
RUN yarn build
RUN yarn --check-files --frozen-lockfile --production --force
RUN yarn cache clean

# DEPLOY IMAGE
FROM node:16.14-alpine
WORKDIR /opt/sofie-portal
COPY --from=0 /opt/sofie-portal .
EXPOSE 3000/tcp
EXPOSE 3000/udp
CMD ["yarn", "start"]
