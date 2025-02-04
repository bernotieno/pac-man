import { Ghost } from './ghost-base.js';

export class Clyde extends Ghost {
    constructor(startIndex, speed, board) {
        super('clyde', startIndex, speed, board);
    }
}