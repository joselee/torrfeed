import { InLeftOutLeft } from '../../animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Book, BookService } from '../book.service';

@Component({
    selector: 'book-list',
    templateUrl: 'book-list.component.html',
    animations: [InLeftOutLeft]
})
export class BookListComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';

    books: Book[];
    constructor(private bookService: BookService) { }

    ngOnInit() {
        this.bookService.getBooks().subscribe(books => this.books = books);
    }
}