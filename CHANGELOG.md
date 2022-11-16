# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.8.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.7.2...v1.8.0) (2021-12-09)


### Features

* Scaling - GUI is now responsive, and will scale content, button and text to the browser window/resolution ([f2b2537](https://github.com/olzzon/tv2-sofie-portal/commit/f2b25373c9ed6f98ff1791ed86604a53e0db8407))


### Bug Fixes

* deploy version tags ([06ecc17](https://github.com/olzzon/tv2-sofie-portal/commit/06ecc17617fd414e848d44f3da185389df7a2efd))
* double setScale(scaleX) ([549466f](https://github.com/olzzon/tv2-sofie-portal/commit/549466f8e5099f070a1e9057e85cf5fc25371d78))
* Typo - forgot to remove "KASPER" in a label test ([b7e7de2](https://github.com/olzzon/tv2-sofie-portal/commit/b7e7de2df8505965eef742238f5b39dec624c619))

### [1.7.2](https://github.com/tv2/sofie-portal/compare/v1.7.1...v1.7.2) (2021-08-16)


### Bug Fixes

* pipeline ([d95b57c](https://github.com/tv2/sofie-portal/commit/d95b57c7d9792b5bb5ef438ce07592e6076369ae))

### [1.7.1](https://github.com/tv2/sofie-portal/compare/v1.7.0...v1.7.1) (2021-08-16)


### Bug Fixes

* pipeline ([7f1832f](https://github.com/tv2/sofie-portal/commit/7f1832ffa3610ab90c64398d334d7bafdc1b3cb6))
* pipeline missing args for pushing to dockerhub ([7068b59](https://github.com/tv2/sofie-portal/commit/7068b59b315fef158cd8b498f015cdd2e6cf6352))

## [1.7.0](https://github.com/tv2/sofie-portal/compare/v1.6.4...v1.7.0) (2021-08-16)


### Features

* pipeline improvements ([858039b](https://github.com/tv2/sofie-portal/commit/858039b76b7ec6d8d420a4250a870c8516c1fa57))

### [1.6.4](https://github.com/tv2/sofie-portal/compare/v1.6.3...v1.6.4) (2021-07-28)


### Bug Fixes

* removed Dockerfile.circle = Dockerfile ([091ffa0](https://github.com/tv2/sofie-portal/commit/091ffa0ac86cbb0596a791d87101275ea5b8ac2b))

### [1.6.3](https://github.com/tv2/sofie-portal/compare/v1.6.2...v1.6.3) (2021-07-28)

### [1.6.2](https://github.com/tv2/sofie-portal/compare/v1.6.1...v1.6.2) (2021-07-28)

### [1.6.1](https://github.com/olzzon/tv2-sofie-portal/compare/v1.6.0...v1.6.1) (2021-06-07)


### Bug Fixes

* logger level was 3to0 instead of 0to3 ([37d811f](https://github.com/olzzon/tv2-sofie-portal/commit/37d811f115c2e641f527be6d08e488e9e40be23f))

## [1.6.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.5.1...v1.6.0) (2021-05-27)


### Features

* Offline button - for switching off screen and VSM source ([ad1120a](https://github.com/olzzon/tv2-sofie-portal/commit/ad1120a23b81b4cce588ff0c0358b2885650ebad))

### [1.5.1](https://github.com/olzzon/tv2-sofie-portal/compare/v1.5.0...v1.5.1) (2021-05-14)


### Bug Fixes

* Moved from NRKNO ember-connection to EVS node-emberplus as there was performance issues with ember-connection ([39eb472](https://github.com/olzzon/tv2-sofie-portal/commit/39eb4727dd0a1fd40bd63e915b6c9de3fe5a254d))

## [1.5.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.4.1...v1.5.0) (2021-05-12)


### Features

* ember integration rename matrix from "test matrix" to "PortalMatrix" ([abb97af](https://github.com/olzzon/tv2-sofie-portal/commit/abb97af30fd09273fbbd16cc011b7ccbf9f60027))

### [1.4.1](https://github.com/olzzon/tv2-sofie-portal/compare/v1.4.0...v1.4.1) (2021-04-25)


### Bug Fixes

* Slave - Client crash if master selects a button with index larger than number of pages in slave ([aa2918a](https://github.com/olzzon/tv2-sofie-portal/commit/aa2918a6044ed90b1f745220f8f826bf4a336b50))

## [1.4.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.3.0...v1.4.0) (2021-04-25)


### Features

* ember integration - Adminpage set Embertarget for user ([ab1fb2d](https://github.com/olzzon/tv2-sofie-portal/commit/ab1fb2d9684514846ead962753bfe3f00dc80a88))
* ember-integration change mtx when user select new room ([5a2ae6c](https://github.com/olzzon/tv2-sofie-portal/commit/5a2ae6cd0e43a2a8a00ef1c02889612690bbd111))
* Portal-Emberserver initial Ember implementation ([112bb2d](https://github.com/olzzon/tv2-sofie-portal/commit/112bb2dccea0308780e9c5863d812a165851c480))


### Bug Fixes

* ember - loggin target state could be undefined ([deeaa7c](https://github.com/olzzon/tv2-sofie-portal/commit/deeaa7c4fcbc108e2dc44350eeb148ba3120a79b))
* ember-implementation mtx offset +1  source instead ofg sourceIndex ([965076d](https://github.com/olzzon/tv2-sofie-portal/commit/965076d2f5725161ae817945401643d06b073f55))
* only connect 1 source to target ([cc4dda1](https://github.com/olzzon/tv2-sofie-portal/commit/cc4dda1f08cbde772003129d8a887ba426c2517c))
* slave mode - when index zero Label was rendered as "Select Page on Master" ([3a7f4b4](https://github.com/olzzon/tv2-sofie-portal/commit/3a7f4b40afdd6e8ca9c45e6b02f9c60daded9053))

## [1.3.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.2.0...v1.3.0) (2021-04-23)


### Features

* master-slave - engine works - ToDo GUI ([001f769](https://github.com/olzzon/tv2-sofie-portal/commit/001f7691c4f2d1ac2c9db6b32ecc3ae7b8a45aed))
* master-slave clients prepare structure and GUI ([e1d0669](https://github.com/olzzon/tv2-sofie-portal/commit/e1d0669f1604e48dddc3fe879350a3989eb5bec4))
* master-slave CSS and name update ToDo: Userlist on slaves ([fbd303b](https://github.com/olzzon/tv2-sofie-portal/commit/fbd303b78b5ad66d7fe3bc31ef478d92c334e91f))


### Bug Fixes

* master-slave an infinite loop on slave was cause by accessing innerscope activeRoomIndex from callabck in outerscope socket ([fa34fe3](https://github.com/olzzon/tv2-sofie-portal/commit/fa34fe35d2a9f6ba88e8f52f4df9f5896b31d5a6))

## [1.2.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.1.2...v1.2.0) (2021-04-21)


### Features

* Admin page - pass default label and default path when selecting a machine in access rights ([325a573](https://github.com/olzzon/tv2-sofie-portal/commit/325a5735c6a1a685a559a69434c3f8f38cf01ee2))
* anonymous client. Setting anonymousAccess = true for a webpage in admin page hides user on active users list ([0015e97](https://github.com/olzzon/tv2-sofie-portal/commit/0015e9706a6e7687a13a50dd5dd9118ca601cd11))

### [1.1.2](https://github.com/olzzon/tv2-sofie-portal/compare/v1.1.1...v1.1.2) (2021-04-16)


### Bug Fixes

* Adminpage - machineId was empty when creating a new weblink ([03e67d5](https://github.com/olzzon/tv2-sofie-portal/commit/03e67d534df086aff3d5f08cff9a8ab25ef1f22f))

### [1.1.1](https://github.com/olzzon/tv2-sofie-portal/compare/v1.1.0...v1.1.1) (2021-04-14)


### Bug Fixes

* Message on screen when wrong user id has been used. (Simple generic text for now) ([5429d83](https://github.com/olzzon/tv2-sofie-portal/commit/5429d838af7c4b2e829b05bcd896ed46c1c521ad))

## [1.1.0](https://github.com/olzzon/tv2-sofie-portal/compare/v1.0.1...v1.1.0) (2021-04-13)


### Features

* admin page - remove webaccess line ([d331012](https://github.com/olzzon/tv2-sofie-portal/commit/d331012a904aeecc102aa9676011ecb25fbaabf3))


### Bug Fixes

* admin page - adding a new user should select new user ([3e47b43](https://github.com/olzzon/tv2-sofie-portal/commit/3e47b43a3fc70e668215fb42aa4b646a6377e701))

### [1.0.1](https://github.com/olzzon/tv2-sofie-portal/compare/v1.0.0...v1.0.1) (2021-04-12)

## [1.0.0](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.8...v1.0.0) (2021-04-03)


### Features

* admin page - copy paste user access ([855dcb7](https://github.com/olzzon/tv2-sofie-portal/commit/855dcb722d436d999d8183d5ddaf4d66b89bdfd2))


### Bug Fixes

* Admin - saved user list was only updates to clients not admin page ([130d245](https://github.com/olzzon/tv2-sofie-portal/commit/130d245cb9aac930a13b02baa52c1596781cb356))

### [0.1.8](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.7...v0.1.8) (2021-04-03)


### Features

* admin page restart server ([2376a33](https://github.com/olzzon/tv2-sofie-portal/commit/2376a337267bb7e84a885144adbe55970b280d56))
* css - admin page show button pressed ([6c3264e](https://github.com/olzzon/tv2-sofie-portal/commit/6c3264e4cd30fd8495754f053e4c67e5002c70a8))


### Bug Fixes

* Admin page add Weblink did not work on first User ([d24cc11](https://github.com/olzzon/tv2-sofie-portal/commit/d24cc112bdc8167d6393688ca68c89e1cdb1c6d4))

### [0.1.7](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.6...v0.1.7) (2021-04-02)


### Features

* admin - default background and added header ([dd53245](https://github.com/olzzon/tv2-sofie-portal/commit/dd53245adfb349ef4e133f6098bdcb99e59a5b68))
* admin - user access dropdown menu for selecting webpages ([620b986](https://github.com/olzzon/tv2-sofie-portal/commit/620b9864af65b42292c849ad9c5b31fcc1cba14c))
* admin page download userfile ([5d9893f](https://github.com/olzzon/tv2-sofie-portal/commit/5d9893f4de240c09e8b7e82b44a328f2bf928337))
* Adminpage - css ([e3897e4](https://github.com/olzzon/tv2-sofie-portal/commit/e3897e4fada8ced2c159c4c929b32c85a2589e6d))
* upload users.json files ([2a7fade](https://github.com/olzzon/tv2-sofie-portal/commit/2a7fade597711d90c7a49df85b1c731970729911))
* user-administration ([99efeba](https://github.com/olzzon/tv2-sofie-portal/commit/99efeba41c92384d1ca754d3dcb9c9dfedf41083))


### Bug Fixes

* admin page - left over of removed saveUserfile function ([01fbdc8](https://github.com/olzzon/tv2-sofie-portal/commit/01fbdc83b8841c9d0cbd91cd36d7a2ae8c313b7d))
* update users on server when saving from admin page ([a52dc17](https://github.com/olzzon/tv2-sofie-portal/commit/a52dc17bccbaa79ea9697af6fa63614881d47680))

### [0.1.6](https://github.com/olzzon/tv2-sofie-portal/compare/v0.1.5...v0.1.6) (2021-03-31)


### Features

* user buttons more than one on same webpage with "path" added to link ([6605edd](https://github.com/olzzon/tv2-sofie-portal/commit/6605eddbfc54bd6e97971684266bb154a7b3a5f3))
* users overrides label - accessrights includes path and user specific label ([f88dc96](https://github.com/olzzon/tv2-sofie-portal/commit/f88dc96091a6e835384a876110a8c401fad75472))
* webpages id as string - seperate users file from settings file ([f3f5bd9](https://github.com/olzzon/tv2-sofie-portal/commit/f3f5bd9c06441d95df1eaa2ef300e0809289c740))


### Bug Fixes

* margin was initial set as 8px - fix: force to 0px ([c6ac707](https://github.com/olzzon/tv2-sofie-portal/commit/c6ac707212698a57ef680dcb93870f31379fd9ce))

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

* refactor interface models fix index.tsx ([29eec77](https://github.com/olzzon/tv2-sofie-portal/commit/29eec7700fcc141e40448987c05dcfddb696f149))
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
