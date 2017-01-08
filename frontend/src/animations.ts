import {
    animate,
    AnimationEntryMetadata,
    style,
    transition,
    trigger
} from '@angular/core';

const animateStyle = '0.33s ease-in-out';
const centerScreen = style({ opacity: 1, transform: 'translateX(0)' });
const offScreenLeft = style({ opacity: 0, transform: 'translateX(-100%)' });
const offScreenRight = style({ opacity: 0, transform: 'translateX(100%)' });


// Enter moves the element off screen instantly, then eases it to the centerScreen
// Exit just eases it off screen, without pre-positioning
export const InLeftOutLeft: AnimationEntryMetadata =
    trigger('routeAnimation', [
        transition(':enter', [
            offScreenLeft,
            animate(animateStyle, centerScreen)
        ]),
        transition(':leave', [
            animate(animateStyle, offScreenLeft)
        ])
    ]);


export const InRightOutRight: AnimationEntryMetadata =
    trigger('routeAnimation', [
        transition(':enter', [
            offScreenRight,
            animate(animateStyle, centerScreen)
        ]),
        transition(':leave', [
            animate(animateStyle, offScreenRight)
        ])
    ]);
