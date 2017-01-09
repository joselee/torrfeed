'use strict';
let path = require('path');
let express = require('express');
let monk = require('monk');
let bodyParser = require('body-parser');

let db = require('./db');
let fetch = require('./fetch');

let app = express();
let frontendPath = path.join(__dirname, '..', 'frontend/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(frontendPath));
app.use('/fonts', express.static(frontendPath + 'build/fonts'));

app.get('/api/episodes', (req, res) => {
    db.episodesCollection.find({ archived: false }).then((episodes) => {
        res.json(episodes);
    });
});

app.get('/api/shows', (req, res) => {
    db.showsCollection.find().then((shows) => {
        res.json(shows);
    })
});

app.get('/api/fetch', (req, res) => {
    fetch();
    res.send('Feeds updated.');
});

app.post('/api/addshow', (req, res) => {
    if (!req.body.name) {
        res.send('Error: name parameter missing.');
        return;
    }

    const name = req.body.name.trim().toLowerCase();

    db.showsCollection.findOne({ name: name }).then((show) => {
        if (!show) {
            console.log(`Adding new show: '${name}'`);
            db.showsCollection.insert({ name: name }).then(() => {
                res.send('Show added.');
                fetch();
            });
        } else {
            res.send('Show already exists. No action taken.');
        }
    });
});

app.post('/api/deleteshow', (req, res) => {
    if (!req.body.id) {
        res.send('Error: id parameter missing.');
        return;
    }

    const id = monk.id(req.body.id);
    db.showsCollection.remove({ '_id': id }).then(() => {
        db.episodesCollection.update(
            { 'show._id': id },
            { $set: { archived: true } },
            { multi: true })
        .then(() => {
            res.send('Show removed, all episode data removed.');
        });
    });
});

app.post('/api/archiveepisode', (req, res) => {
    if (!req.body.id) {
        res.send('Error: id parameter missing.');
        return;
    }

    const id = monk.id(req.body.id);
    db.episodesCollection.findOneAndUpdate({ _id: id }, { $set: { archived: true } }).then((ep) => {
        if (ep) {
            res.send('Episode archived.');
        } else {
            res.send('Could not find episode to archive.');
        }
    });
});

app.get('/*', (req, res) => {
    res.sendFile(frontendPath + 'index.html');
});

app.listen(3000, () => {
    console.log('Torrent-FeedReader started on port 3000.')
});