// Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';

// Services
import { MenuService } from './menu/menu.service';
import { DatePipe } from '@angular/common';
import { EpisodeService } from './episode/episode.service';
import { ShowService } from './show/show.service';
import { DateHelperService } from './shared/date-helper.service';

// Components
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { EpisodeListComponent } from './episode/episode-list.component';
import { ShowListComponent } from './show/show-list.component';
import { ShowDetailComponent } from './show/detail/show-detail.component';

const appRoutes: Routes = [
    {
        path: 'episodes',
        component: EpisodeListComponent
    },
    {
        path: 'shows/:id',
        component: ShowDetailComponent
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
        ShowListComponent,
        ShowDetailComponent
    ],
    providers: [
        MenuService,
        EpisodeService,
        ShowService,
        DateHelperService,
        DatePipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
