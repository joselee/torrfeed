import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { Episode, EpisodeService } from './episode.service';
import { DateHelperService } from '../shared/date-helper.service';

@Component({
    selector: 'episode-list',
    templateUrl: 'episode-list.component.html'
})
export class EpisodeListComponent implements OnInit {
    @Input() episodes: Episode[];
    lastRenderedDate: string;

    constructor(private episodeService: EpisodeService,
        private dateHelperService: DateHelperService,
        private datePipe: DatePipe,
        private domSanitizer: DomSanitizer) { }

    ngOnInit() {
        if (!this.episodes){
            this.getEpisodes();
        }
    }

    getEpisodes() {
        this.episodeService.getEpisodes().subscribe(episodes => {
            this.episodes = episodes;
        });
    }

    archiveEpisode(episode: Episode) {
        this.episodeService.archiveEpisode(episode).subscribe(() => this.getEpisodes());
    }

    getFormattedDate(date: Date) {
        let result;
        if (this.dateHelperService.isToday(date)) {
            result = 'today';
        } else if (this.dateHelperService.isYesterday(date)) {
            result = 'yesterday';
        } else {
            result = this.datePipe.transform(date, 'MMM d');
        }

        if (this.lastRenderedDate === result) {
            return null;
        } else {
            this.lastRenderedDate = result;
            return result;
        }
    }

    sanitize(linkUrl: string) {
        return this.domSanitizer.bypassSecurityTrustUrl(linkUrl)
    }
}