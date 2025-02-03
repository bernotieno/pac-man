import { DIRECTIONS, isValidMove, calculateNextIndex } from './utils.js';

export class Pacman {
    constructor(startIndex, board) {
        this.currentIndex = startIndex;
        this.board = board;
        this.direction = 0;
        this.timeSinceLastMove = 0;
        this.moveDelay = 200; // ms between moves
        this.squares = board.getSquares();
        this.squares[this.currentIndex].classList.add('pac-man');
    }

    move(deltaTime) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.moveDelay) return;

        this.timeSinceLastMove = 0;
        
        if (this.direction === 0) return;

        this.squares[this.currentIndex].classList.remove('pac-man');
        
        let nextIndex = calculateNextIndex(this.currentIndex, this.direction);

        // Check for tunnel
        if (nextIndex === -1) {
            nextIndex = this.squares.length - 2;
        } else if (nextIndex === this.squares.length) {
            nextIndex = 0;
        }

        if (isValidMove(this.squares, nextIndex)) {
            this.currentIndex = nextIndex;
        }

        this.squares[this.currentIndex].classList.add('pac-man');
    }

    setDirection(e) {
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
                this.direction = DIRECTIONS[e.key];
                break;
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    reset(startIndex) {
        this.squares[this.currentIndex].classList.remove('pac-man');
        this.currentIndex = startIndex;
        this.direction = 0;
        this.squares[this.currentIndex].classList.add('pac-man');
    }
} 