import { GRID_SIZE, isValidMove } from './utils.js';

export class Ghost {
    constructor(className, startIndex, speed, board) {
        this.className = className;
        this.startIndex = startIndex;
        this.currentIndex = startIndex;
        this.speed = speed;
        this.timeSinceLastMove = 0;
        this.isScared = false;
        this.board = board;
        this.squares = board.getSquares();
        this.direction = -1;
        this.squares[startIndex].classList.add(className);
    }

    move(deltaTime) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.speed) return;

        this.timeSinceLastMove = 0;

        this.squares[this.currentIndex].classList.remove(this.className);
        this.squares[this.currentIndex].classList.remove('scared-ghost');

        const directions = [-1, +1, -GRID_SIZE, +GRID_SIZE];
        let direction = directions[Math.floor(Math.random() * directions.length)];

        let nextIndex = this.currentIndex + direction;

        if (isValidMove(this.squares, nextIndex) && !this.squares[nextIndex].classList.contains('ghost')) {
            this.currentIndex = nextIndex;
        }

        this.squares[this.currentIndex].classList.add(this.className);
        if (this.isScared) {
            this.squares[this.currentIndex].classList.add('scared-ghost');
        }
    }

    setScared(scared) {
        this.isScared = scared;
        if (scared) {
            this.squares[this.currentIndex].classList.add('scared-ghost');
        } else {
            this.squares[this.currentIndex].classList.remove('scared-ghost');
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    reset() {
        this.squares[this.currentIndex].classList.remove(this.className);
        this.squares[this.currentIndex].classList.remove('scared-ghost');
        this.currentIndex = this.startIndex;
        this.squares[this.currentIndex].classList.add(this.className);
        this.isScared = false;
    }
} 