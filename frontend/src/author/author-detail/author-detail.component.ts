import { InRightOutRight } from '../../animations';
import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'author-detail',
    templateUrl: 'author-detail.component.html',
    animations: [InRightOutRight]
})
export class AuthorDetailComponent {
    @HostBinding('@routeAnimation') routeAnimation = true;
    @HostBinding('style.display') display = 'block';
    @HostBinding('style.position') position = 'absolute';
}