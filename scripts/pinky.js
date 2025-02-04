import { Ghost } from './ghost-base.js';

export class Pinky extends Ghost {
    constructor(startIndex, speed, board) {
        super('pinky', startIndex, speed, board);
    }
}