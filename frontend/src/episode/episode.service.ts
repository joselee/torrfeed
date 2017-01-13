import { Show } from '../show/show.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export class Episode {
    '_id': string;
    'id': string;
    'feed': string;
    'date': Date;
    'title': string;
    'directLink': string;
    'filename': string;
    'magnet': string | null;
    'peerInfo': string;
    'show': Show;
}

@Injectable()
export class EpisodeService {
    constructor(private http: Http) { }

    getEpisodes() {
        return this.http
            .get('/api/episodes')
            .map((response: Response) => {
                let episodes = <Episode[]>response.json();
                episodes.forEach((e) => e.date = new Date(e.date));
                episodes = _.sortBy(episodes, (e) => -e.date);
                return episodes;
            })
            .catch(this.handleError);
    }

    archiveEpisode(episode: Episode) {
        return this.http
            .post('/api/archiveepisode', { id: episode['_id'] })
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(`Error status code ${error.status} at ${error.url}`);
    }
}