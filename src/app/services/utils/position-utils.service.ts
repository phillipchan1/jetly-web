import { Injectable } from '@angular/core';

@Injectable()
export class PositionUtilsService {
    constructor() {}

    public calculateLeft(el) {
        return `${el.offsetLeft + el.offsetWidth}px`;
    }

    public calculateTop(el) {
        const inTheMiddleHeight = el.offsetTop + el.offsetHeight / 4;

        return `${inTheMiddleHeight}px`;
    }
}
