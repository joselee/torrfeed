import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MenuService {
    constructor(private http: Http) { }

    fetch() {
        return this.http
            .get('/api/fetch').catch(this.handleError);
    }

    handleError(error: Response) {
        console.error(error);
        return Observable.throw(`Error status code ${error.status} at ${error.url}`);
    }
}