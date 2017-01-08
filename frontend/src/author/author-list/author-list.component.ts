import { InLeftOutLeft } from '../../animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Author, AuthorService } from '../author.service';

@Component({
    selector: 'author-list',
    templateUrl: 'author-list.component.html',
    animations: [InLeftOutLeft]
})
export class AuthorListComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';

    authors: Author[];
    constructor(private authorService: AuthorService) { }

    ngOnInit() {
        this.authorService.getAuthors().subscribe(authors => this.authors = authors);
    }
}