import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Author {
    id: number;
    name: string;
    image: string;
}

@Injectable()
export class AuthorService {
    constructor(private http: Http) { }

    getAuthors() {
        return this.http
            .get('api/authors.json')
            .map((response: Response) => <Author[]>response.json())
            .catch(this.handleError);
    }

     handleError(error: Response) {
        console.error(error);
        return Observable.throw(`Error status code ${error.status} at ${error.url}`);
    }
}