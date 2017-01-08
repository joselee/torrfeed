import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AuthorListComponent } from './author-list/author-list.component';
import { AuthorDetailComponent } from './author-detail/author-detail.component';
import { AuthorService } from './author.service';

const authorRoutes: Routes = [
    {
        path: 'authors',
        component: AuthorListComponent
    },
    {
        path: 'authors/:id',
        component: AuthorDetailComponent
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forChild(authorRoutes)
    ],
    exports: [RouterModule],
    declarations: [
        AuthorListComponent,
        AuthorDetailComponent
    ],
    providers: [AuthorService]
})
export class AuthorModule { }