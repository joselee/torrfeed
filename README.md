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
  * `npm start`

#### Setup and run in production mode
* ensure mongod is running
* `cd frontend`
* `npm install`
* `npm run prod`
* `cd ../backend`
* `npm install`
* `npm run prod`