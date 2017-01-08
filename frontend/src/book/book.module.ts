import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookService } from './book.service';

const bookRoutes: Routes = [
    {
        path: 'books',
        component: BookListComponent
    },
    {
        path: 'books/:id',
        component: BookDetailComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(bookRoutes)
    ],
    exports: [RouterModule],
    declarations: [
        BookListComponent,
        BookDetailComponent
    ],
    providers: [BookService]
})
export class BookModule { }