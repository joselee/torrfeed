'use strict';
let _ = require('lodash');
let path = require('path');
let request = require('request');
let express = require('express');
let parser = require('xml2json');
let monk = require('monk');
let bodyParser = require('body-parser');
let feeds = require('./feeds');

let app = express();
let frontendPath = path.join(__dirname, '..', 'frontend/');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(frontendPath));

let db = monk('localhost:27017/torrentfeedreader');
let showsCollection = db.get('shows');
let airedCollection = db.get('aired');
let lastFetched;

let fetch = () => {
    lastFetched = new Date();
    console.log('fetching - ' + lastFetched);
    _.each(feeds, (feed) => {
        request(feed.url, (error, response, body) => {
            if (error) {
                throw new Error(error);
            }

            let json = JSON.parse(parser.toJson(body));
            let allEpisodes = json.rss.channel.item;

            _.each(allEpisodes, (ep) => {
                showsCollection.find().then((allShows) => {
                    let show = _.find(allShows, (show) => ep.title.toLowerCase().indexOf(show.name) !== -1);
                    if (show) {
                        let parsedEp = feed.parseData(ep, show);
                        airedCollection.update({ id: parsedEp.id }, { $set: parsedEp }, { upsert: true, new: true }).catch((err) => {
                            console.log(err);
                        });
                    }
                });
            });
        });
    });
};

fetch();
setInterval(() => {
    fetch();
}, 600000); // fetch every 10 minutes

app.get('/api/episodes', (req, res) => {
    airedCollection.find({ archived: false }).then((episodes) => {
        res.json(episodes);
    });
});

app.get('/api/shows', (req, res) => {
    showsCollection.find().then((shows) => {
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

    showsCollection.findOne({ name: name }).then((show) => {
        if (!show) {
            console.log(`Adding new show: '${name}'`);
            showsCollection.insert({ name: name }).then(() => {
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
    showsCollection.remove({ '_id': id }).then(() => {
        airedCollection.update({ 'show._id': id }, { $set: { archived: true } }, { multi: true }).then(() => {
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
    airedCollection.findOneAndUpdate({ _id: id }, { $set: { archived: true } }).then((ep) => {
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