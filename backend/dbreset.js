'use strict';
const monk = require('monk');
const db = monk('localhost:27017/torrentfeedreader')
const shows = db.get('shows');
const aired = db.get('aired');
const list = [
    {name: 'shameless'},
    {name: 'planet earth'},
    {name: 'the walking dead'},
    {name: 'westworld'},
    {name: 'game of thrones'},
    {name: 'rick and morty'},
    {name: 'black mirror'},
    {name: 'lucifer'},
    {name: 'frequency'},
    {name: 'one piece'},
    {name: 'haikyuu'},
    {name: 'natsume yuujinchou'}
];
aired.remove();
shows.remove().then(()=>{
    shows.insert(list).then(() => db.close());
});