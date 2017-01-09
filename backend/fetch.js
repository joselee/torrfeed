let _ = require('lodash');
let request = require('request');
let parser = require('xml2json');

let db = require('./db');
let feeds = require('./feeds');

let fetch = () => {
    _.each(feeds, (feed) => {
        request(feed.url, (error, response, body) => {
            if (error) {
                throw new Error(error);
            }

            let json = JSON.parse(parser.toJson(body));
            let allEpisodes = json.rss.channel.item;

            _.each(allEpisodes, (ep) => {
                db.showsCollection.find().then((allShows) => {
                    let show = _.find(allShows, (show) => ep.title.toLowerCase().indexOf(show.name) !== -1);
                    if (show) {
                        let parsedEp = feed.parseData(ep, show);
                        db.episodesCollection.update(
                            { id: parsedEp.id },
                            { $set: parsedEp },
                            { upsert: true, new: true })
                        .catch((err) => {
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

module.exports = fetch;