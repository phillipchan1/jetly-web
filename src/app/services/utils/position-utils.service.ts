import { Injectable } from '@angular/core';

@Injectable()
export class PositionUtilsService {
    constructor() {}

    public closerToLeftorRightofScreen(el):string {
        var windowWidth = window.innerWidth;

        if (el.offsetLeft < windowWidth / 2) {
            return 'left';
        } else {
            return 'right'
        }
    }

    public closerToToporBottomofScreen(el):string {
        var windowWidth = window.innerHeight;

        if (el.offsetTop < windowWidth / 2) {
            return 'top';
        } else {
            return 'bottom'
        }
    }
}
