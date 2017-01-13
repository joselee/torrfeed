import { DatePipe } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Episode, EpisodeService } from './episode.service';
import { DateHelperService } from '../shared/date-helper.service';

@Component({
    selector: 'episode-list',
    templateUrl: 'episode-list.component.html'
})
export class EpisodeListComponent implements OnInit {
    episodes: Episode[];
    constructor(private episodeService: EpisodeService,
                private dateHelperService: DateHelperService,
                private datePipe: DatePipe) { }

    ngOnInit() {
        this.getEpisodes();
    }

    getEpisodes() {
        this.episodeService.getEpisodes().subscribe(episodes => this.episodes = episodes);
    }

    archiveEpisode(episode: Episode) {
        this.episodeService.archiveEpisode(episode).subscribe(() => this.getEpisodes());
    }

    getFormattedDate(date: Date) {
        if (this.dateHelperService.isToday(date)){
            return 'today';
        } else if (this.dateHelperService.isYesterday(date)) {
            return 'yesterday';
        } else {
            return this.datePipe.transform(date, 'MMM d');
        }
    }
}