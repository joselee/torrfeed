import { Component, HostBinding, OnInit } from '@angular/core';
import { Show, ShowService } from './show.service';

@Component({
    selector: 'show-list',
    templateUrl: 'show-list.component.html'
})
export class ShowListComponent implements OnInit {
    shows: Show[];
    newShow: string;
    constructor(private showService: ShowService) { }

    ngOnInit() {
        this.getShows();
    }

    getShows() {
        this.showService.getShows().subscribe(shows => this.shows = shows);
    }

    addNewShow(e: KeyboardEvent) {
        if (e.keyCode === 13 && this.newShow) {
            this.showService.addShow(this.newShow).subscribe(() => {
                this.getShows();
                this.newShow = '';
            });
        }
    }

    deleteShow(show: Show) {
        this.showService.deleteShow(show).subscribe(() => this.getShows());
    }
}