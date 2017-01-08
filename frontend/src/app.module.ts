import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { EpisodeListComponent } from './episode/episode-list.component';
import { EpisodeService } from './episode/episode.service';
import { ShowListComponent } from './show/show-list.component';
import { ShowService } from './show/show.service';

const appRoutes: Routes = [
    {
        path: 'shows',
        component: ShowListComponent
    },
    {
        path: '',
        component: EpisodeListComponent,
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        NgbModule.forRoot(),
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        EpisodeListComponent,
        ShowListComponent
    ],
    providers: [
        EpisodeService,
        ShowService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
