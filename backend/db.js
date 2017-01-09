'use strict';
const monk = require('monk');
const db = monk('localhost:27017/torrfeed');
const showsCollection = db.get('shows');
const episodesCollection = db.get('episodes');

module.exports = {
    showsCollection: showsCollection,
    episodesCollection: episodesCollection,
    close: () => { db.close() }
};