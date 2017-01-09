import { FadeInOut } from '../animations';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Episode, EpisodeService } from './episode.service';

@Component({
    selector: 'episode-list',
    templateUrl: 'episode-list.component.html'
})
export class EpisodeListComponent implements OnInit {
    episodes: Episode[];
    constructor(private episodeService: EpisodeService) { }

    ngOnInit() {
        this.getEpisodes();
    }

    getEpisodes() {
        this.episodeService.getEpisodes().subscribe(episodes => this.episodes = episodes);
    }

    archiveEpisode(episode: Episode) {
        this.episodeService.archiveEpisode(episode).subscribe(() => this.getEpisodes());
    }
}