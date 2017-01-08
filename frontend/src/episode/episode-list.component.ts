import { InLeftOutLeft } from '../animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Episode, EpisodeService } from './episode.service';

@Component({
    selector: 'episode-list',
    templateUrl: 'episode-list.component.html',
    animations: [InLeftOutLeft]
})
export class EpisodeListComponent implements OnInit {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';

    episodes: Episode[];
    constructor(private episodeService: EpisodeService) { }

    ngOnInit() {
        this.episodeService.getEpisodes().subscribe(episodes => this.episodes = episodes);
    }
}