import { Ghost } from './ghost-base.js';

export class Inky extends Ghost {
    constructor(startIndex, speed, board) {
        super('inky', startIndex, speed, board);
    }
}