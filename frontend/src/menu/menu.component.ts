import { MenuService } from './menu.service';
import { Component } from '@angular/core';

@Component({
    selector: 'top-menu',
    templateUrl: 'menu.component.html'
})
export class MenuComponent {
    constructor(private menuService: MenuService) {}

    triggerFetch() {
        this.menuService.fetch().subscribe(() => {
            window.location.reload();
        });
    }
}