'use strict';
let url = 'https://eztv.ag/ezrss.xml';
let feedName = 'EZTV';
let parser = (episodeData, show) => {
    let peerInfo = episodeData['torrent:seeds'] + ' seeder(s), ' + episodeData['torrent:peers'] + ' leecher(s)'
    return {
        feed: feedName,
        id: episodeData.guid,
        date: episodeData.pubDate,
        title: episodeData.title,
        directLink: episodeData.enclosure.url,
        filename: episodeData['torrent:fileName'],
        magnet: episodeData['torrent:magnetURI'],
        peerInfo: peerInfo,
        show: show
    };
};

module.exports = {
    url: url,
    name: feedName,
    parseData: parser
};