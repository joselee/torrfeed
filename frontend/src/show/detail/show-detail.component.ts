import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Show, ShowService } from '../show.service';
import { Episode } from '../../episode/episode.service';

@Component({
    selector: 'show-detail',
    templateUrl: 'show-detail.component.html',
})
export class ShowDetailComponent implements OnInit {
    show: Show;
    episodes: Episode[];

    constructor(private route: ActivatedRoute,
        private router: Router,
        private showService: ShowService) { }

    ngOnInit() {
        this.route.params
            .map((params: Params) => params['id'])
            .subscribe(id => this.getShow(id));
    }

    getShow(id: string) {
        this.showService.getShow(id).subscribe(show => this.show = show);
        this.showService.getShowEpisodes(id).subscribe(episodes => {
            this.episodes = episodes;
        });
    }
}
