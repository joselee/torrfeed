import {
    animate,
    AnimationEntryMetadata,
    state,
    style,
    transition,
    trigger
} from '@angular/core';

const style_invisible = style({ opacity: 0 });
const style_visible = style({ opacity: 1 });

export const FadeInOut: AnimationEntryMetadata =
    trigger('routeAnimation', [
        transition(':enter', [
            style_invisible,
            animate('0.20s 0.15s ease-in', style_visible)
        ]),
        transition(':leave', [
            animate('0.15s ease-out', style_invisible)
        ])
    ]);