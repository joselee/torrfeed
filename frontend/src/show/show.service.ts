import { Episode } from '../episode/episode.service';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

export class Show {
    '_id': string;
    'name': string;
}

@Injectable()
export class ShowService {
    constructor(private http: Http) { }

    getShows() {
        return this.http
            .get('/api/shows')
            .map((response: Response) => {
                let shows = <Show[]>response.json();
                shows = _.sortBy(shows, (s) => s.name);
                return shows;
            })
            .catch(this.handleError);
    }

    getShow(id: string) {
        return this.getShows()
            .map(shows => {
                return shows.find(show => show['_id'] === id);
            });
    }

    getShowEpisodes(id: string) {
        return this.http
            .post('/api/showdetails', { id: id })
            .map((response: Response) => {
                let episodes = <Episode[]>response.json();
                episodes.forEach((e) => e.date = new Date(e.date));
                episodes = _.sortBy(episodes, (e) => -e.date);
                return episodes;
            })
            .catch(this.handleError);
    }

    addShow(newShow: string) {
        return this.http
            .post('/api/addshow', { name: newShow })
            .catch(this.handleError);
    }

    deleteShow(show: Show) {
        return this.http
            .post('/api/deleteshow', { id: show['_id'] })
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(`Error status code ${error.status} at ${error.url}`);
    }
}