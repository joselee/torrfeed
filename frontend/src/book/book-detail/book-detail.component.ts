import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Book, BookService } from '../book.service';
import { InRightOutRight } from '../../animations';

@Component({
    selector: 'book-detail',
    templateUrl: 'book-detail.component.html',
    animations: [InRightOutRight]
})
export class BookDetailComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';

    private book: Book;

    constructor(private route: ActivatedRoute,
        private router: Router,
        private bookService: BookService) { }

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'])
            .subscribe(id => this.getBook(+id));
    }

    getBook(id: number) {
        this.bookService.getBook(id)
            .subscribe(book => this.book = book);
    }
}