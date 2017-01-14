### TORRfeed
Torrent aggregation app. 

#### Prerequisites
* node
* npm
* mongodb

#### Setup and run in development mode
* ensure mongod is running
* open one shell:
  * `cd frontend`
  * `npm install`
  * `npm start` - watches for changes and rebuilds
* open another shell:
  * `cd backend`
  * `npm install`
  * `npm start` - runs app on port 3000

#### Setup and run in production mode
* ensure mongod is running
* `cd frontend`
* `npm install`
* `npm run prod` - builds frontend code to frontend/dist directory
* `cd ../backend`
* `npm install`
* `npm run prod` - runs app on port 80 **Note: use sudo on Linux or Mac**