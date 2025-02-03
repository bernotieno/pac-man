import { layout, GRID_SIZE } from './utils.js';

export class Board {
    constructor() {
        this.squares = [];
        this.grid = document.querySelector('.grid');
        this.createBoard();
    }

    createBoard() {
        for (let i = 0; i < layout.length; i++) {
            const square = document.createElement('div');
            this.grid.appendChild(square);
            this.squares.push(square);

            // Add layout classes
            if (layout[i] === 0) {
                this.squares[i].classList.add('pac-dot');
            } else if (layout[i] === 1) {
                this.squares[i].classList.add('wall');
            } else if (layout[i] === 2) {
                this.squares[i].classList.add('ghost-lair');
            } else if (layout[i] === 3) {
                this.squares[i].classList.add('power-pellet');
            }
        }
    }

    removePacDot(index) {
        this.squares[index].classList.remove('pac-dot');
    }

    removePowerPellet(index) {
        this.squares[index].classList.remove('power-pellet');
    }

    getSquares() {
        return this.squares;
    }

    checkWin() {
        return !this.squares.some(square => square.classList.contains('pac-dot'));
    }
} 