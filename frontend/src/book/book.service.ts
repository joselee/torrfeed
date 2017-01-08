import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class Book {
    id: number;
    title: string;
    authorId: number;
    imageUrl: string;
}

@Injectable()
export class BookService {
    constructor(private http: Http) { }

    getBooks() {
        return this.http
            .get('api/books.json')
            .map((response: Response) => <Book[]>response.json())
            .catch(this.handleError);
    }

    getBook(id: number) {
        return this.getBooks()
            .map(books => {
                let book = books.find(book => book.id === id);
                return book;
            });
    }

     handleError(error: Response) {
        console.error(error);
        return Observable.throw(`Error status code ${error.status} at ${error.url}`);
    }
}