# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.5](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.4...v0.1.5) (2021-03-12)


### Features

* user-access - full implementation. Moved management of users to serverside, so client only sees itself as user. ([cfd4213](https://github.com/olzzon/tv2-sofie-portal/commit/cfd4213edadaba8ec8e41a0845b8a415d84422df))
* useracccess - added constants for socket IO and added accessRights in settings.json and in interface ([5514da0](https://github.com/olzzon/tv2-sofie-portal/commit/5514da06b46f6c5d4a9962a81db9b64dd9e2489f))


### Bug Fixes

* add key in child components to avoid react warning of iterations ([f5a39fa](https://github.com/olzzon/tv2-sofie-portal/commit/f5a39fa84be3b9606d9d78b42d5f5f15bcda42ad))

### [0.1.4](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.3...v0.1.4) (2021-03-10)


### Features

* client-build copy html, fix build server - still mssing: path for loading index.js in index.html ([2ca141f](https://github.com/olzzon/tv2-sofie-portal/commit/2ca141f0035bc56fd207e5eba689dc2988b0bc85))
* dev-client webpack with watch option ([f03949f](https://github.com/olzzon/tv2-sofie-portal/commit/f03949fc66766f5431a0890dba09e2c8d6f289df))
* initial commit of Refactor to webpack - server working. ([c160328](https://github.com/olzzon/tv2-sofie-portal/commit/c160328a0f08f7c9d7269b67f53c7b4ff5fa6427))
* refactor to ./src structure - build, watch using tsc and webpack full functioning ([3a2e455](https://github.com/olzzon/tv2-sofie-portal/commit/3a2e455f48383bedd73f2e371c89d84c05dd9900))
* Webpack build - still not working ([f1aadb7](https://github.com/olzzon/tv2-sofie-portal/commit/f1aadb7813044e22d862b339da2f1aa4283d353b))
* webpack build-client working ([9bec991](https://github.com/olzzon/tv2-sofie-portal/commit/9bec991085c56b615a816f0b2c91746f5330c68f))


### Bug Fixes

* CSS load background colors etc ([ab5c1b5](https://github.com/olzzon/tv2-sofie-portal/commit/ab5c1b5607ff818dd39708c8995e4f2c2d0de995))

### [0.1.3](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.2...v0.1.3) (2021-03-09)


### Features

* client gets settings from server.ts instead of directly from file ([500fc73](https://github.com/olzzon/tv2-sofie-portal/commit/500fc730303571fd2fc8d2aea13e2c35e570518e))
* refactor - server.ts repeated code (update all clients users in room state) moved to function ([55c4119](https://github.com/olzzon/tv2-sofie-portal/commit/55c4119544c89139454d08618e8df69f8b63d284))
* refactor Interface models ([66bc331](https://github.com/olzzon/tv2-sofie-portal/commit/66bc3319cfe1fd7bdd24e324010c23b88beaef34))
* SPA - prepare move to SPA outside nextJS ([3efb9a3](https://github.com/olzzon/tv2-sofie-portal/commit/3efb9a31e94e42840fc33ee4f7926b7867c5aa1a))


### Bug Fixes

* refactor interface models fix index.ts ([29eec77](https://github.com/olzzon/tv2-sofie-portal/commit/29eec7700fcc141e40448987c05dcfddb696f149))
* server.ts leaveRoom only left if it was empty ([a113e9e](https://github.com/olzzon/tv2-sofie-portal/commit/a113e9ebc7ff3d120ec0472b47fb9b42e120c61b))
* use settings webpages to iterate over rooms. As socket.rooms er return some id instead of roomname ([019a0eb](https://github.com/olzzon/tv2-sofie-portal/commit/019a0eb2c3cd39b0778967437fb2554b3f219f0f))
* use webpage.id.toString() as room ([5a2a58c](https://github.com/olzzon/tv2-sofie-portal/commit/5a2a58cd7e8a3ef9261c8c62209253488169e5a0))

### [0.1.2](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.1...v0.1.2) (2021-03-07)


### Features

* Display usernames instead of user id ([630b9a1](https://github.com/olzzon/tv2-sofie-portal/commit/630b9a1dc1ffae6a3488751687c4ffac487a0bcb))
* rewrite of socketio server and client with typescript support, types and major refactoring ([ce78dbc](https://github.com/olzzon/tv2-sofie-portal/commit/ce78dbc334afb0430755af7e2c5830a1d7a515fd))
* Styling & CSS ([f63e747](https://github.com/olzzon/tv2-sofie-portal/commit/f63e747c181de9dd8a6de8ed11cdcc6028b2c61e))


### Bug Fixes

* add files missing in last commit ([dd4e272](https://github.com/olzzon/tv2-sofie-portal/commit/dd4e27295150645fadf8e6c9c65c91932ab14457))
* Dockerfile use start-docker instead of start ([ebc752c](https://github.com/olzzon/tv2-sofie-portal/commit/ebc752c1b952af526c0960863ab05d43092ba22a))

### 0.1.1 (2021-03-03)


### Features

* 2 lines button and user name ([454fdb7](https://github.com/olzzon/tv2-sofie-portal/commit/454fdb7a12247886a536dc91576e5b3fa2249aa2))
* Add correct username on webpage - implement Users types ([04dff79](https://github.com/olzzon/tv2-sofie-portal/commit/04dff790ecfe559330166788b9c8537c502518c8))
* implement version handling with standard-release ([2aaeea4](https://github.com/olzzon/tv2-sofie-portal/commit/2aaeea46d5b74ba4cc4b7f7cc28048770a347333))
* prepare file for state ([3e65c01](https://github.com/olzzon/tv2-sofie-portal/commit/3e65c01032e0afdf875712716562210140db08cb))


### Bug Fixes

* Dockerfile CMD - yarn start instead of yarn run ([7cd31c3](https://github.com/olzzon/tv2-sofie-portal/commit/7cd31c3fea9d3a68dc2f45e55fddc870f40ab510))
* force build of deployment-docker-ci develop branch ([90c9992](https://github.com/olzzon/tv2-sofie-portal/commit/90c99929089fc702793d53fa08b9f4694e81d575))
* Return error message if no user or wrong user was attribute ([f005b64](https://github.com/olzzon/tv2-sofie-portal/commit/f005b64652aaeabf34f60434739225fc0357f8df))
* update license and version in package.json ([4385de1](https://github.com/olzzon/tv2-sofie-portal/commit/4385de18621870c0f2a4de9acb3e6c47d90507e0))
