import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EpisodeListComponent } from './episode/episode-list.component';
import { EpisodeService } from './episode/episode.service';
import { ShowListComponent } from './show/show-list.component';
import { ShowService } from './show/show.service';
import { DateHelperService } from './shared/date-helper.service';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
    {
        path: 'episodes',
        component: EpisodeListComponent
    },
    {
        path: 'shows',
        component: ShowListComponent
    },
    {
        path: '',
        redirectTo: 'episodes',
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
        MenuComponent,
        EpisodeListComponent,
        ShowListComponent
    ],
    providers: [
        EpisodeService,
        ShowService,
        DateHelperService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
