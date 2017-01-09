import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

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
            .map((response: Response) => <Show[]>response.json())
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