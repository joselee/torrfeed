'use strict';
let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let api = require('./api');

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let PRODUCTION = process.env.NODE_ENV === 'production';
let rootDir = PRODUCTION ? 'frontend/dist/' : 'frontend/';
let fontsDir = PRODUCTION ? 'fonts' : 'build/fonts';
let frontendPath = path.join(__dirname, '..', rootDir);
app.use(express.static(frontendPath));
app.use('/fonts', express.static(frontendPath + fontsDir));

api.registerRoutes(app);

app.get('/*', (req, res) => {
    res.sendFile(frontendPath + 'index.html');
});

app.listen(3000, () => {
    console.log('Torrent-FeedReader started on port 3000.')
});

console.log(process.env.NODE_ENV === 'production');