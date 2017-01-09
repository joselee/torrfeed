'use strict';
let db = require('./db');

const list = [
    { name: 'shameless' },
    { name: 'planet earth' },
    { name: 'the walking dead' },
    { name: 'westworld' },
    { name: 'game of thrones' },
    { name: 'rick and morty' },
    { name: 'black mirror' },
    { name: 'lucifer' },
    { name: 'frequency' },
    { name: 'one piece' },
    { name: 'haikyuu' },
    { name: 'natsume yuujinchou' }
];
db.episodesCollection.remove().then(() => {
    db.showsCollection.remove().then(() => {
        db.showsCollection.insert(list).then(() => db.close());
    });
});