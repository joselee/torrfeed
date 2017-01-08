'use strict';
let url = 'https://www.nyaa.se/?page=rss';
let feedName = 'Nyaa';
let parser = (episodeData, show) => {
    let peers = episodeData.description.split(', ');
    let peerInfo = peers[0] + ", " + peers[1];
    return {
        feed: feedName,
        id: episodeData.guid,
        date: episodeData.pubDate,
        title: episodeData.title,
        directLink: episodeData.link,
        filename: episodeData.title,
        magnet: null,
        peerInfo: peerInfo,
        archived: false,
        show: show
    };
};

module.exports = {
    url: url,
    name: feedName,
    parseData: parser
};