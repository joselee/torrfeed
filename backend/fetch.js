let _ = require('lodash');
let request = require('request');
let parser = require('xml2json');
let monk = require('monk');
let db = require('./db');
let feeds = require('./feeds');

let fetch = () => {
    db.showsCollection.find().then((allShows) => {
        _.each(feeds, (feed) => {
            request(feed.url, (error, response, body) => {
                if (error) {
                    console.log(`fetching ${feed.url} failed`, error);
                    return;
                }

                console.log(`fetched ${feed.url} successfully`);
                let json = JSON.parse(parser.toJson(body));
                let episodes = json.rss.channel.item;

                _.each(episodes, (ep) => {
                    let show = _.find(allShows, (show) => ep.title.toLowerCase().indexOf(show.name) !== -1);
                    if (show) {
                        let parsedEp = feed.parseData(ep, show);
                        db.episodesCollection.find({ id: parsedEp.id }, 'id show').then((docs) => {
                            if (docs.length === 0){
                                console.log(`Adding new episode ${parsedEp.title}`);
                                db.episodesCollection.insert(parsedEp);
                            } else if (docs.length === 1) {
                                if(docs[0].show['_id'].toString() !== show['_id'].toString()) {
                                    console.log(`Updating show for episode ${parsedEp.title}`);
                                    db.episodesCollection.update(
                                        { id: parsedEp.id },
                                        { $set: { archived: false, show: show } }
                                    );
                                }
                            }
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