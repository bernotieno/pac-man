import { GRID_SIZE } from './utils.js';

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
        this.previousIndex = startIndex;
    }

    isWall(index) {
        return this.squares[index].classList.contains('wall');
    }

    isGhostLair(index) {
        return this.squares[index].classList.contains('ghost-lair');
    }

    isValidDirection(direction) {
        const nextIndex = this.currentIndex + direction;
        
        if (nextIndex < 0 || nextIndex >= this.squares.length) return false;
        if (this.isWall(nextIndex)) return false;
        if (this.squares[nextIndex].classList.contains('ghost') && !this.isGhostLair(nextIndex)) return false;
        
        if (direction === -1 || direction === 1) {
            const currentRow = Math.floor(this.currentIndex / GRID_SIZE);
            const nextRow = Math.floor(nextIndex / GRID_SIZE);
            if (currentRow !== nextRow) return false;
        }
        
        if (direction === -GRID_SIZE || direction === GRID_SIZE) {
            const currentCol = this.currentIndex % GRID_SIZE;
            const nextCol = nextIndex % GRID_SIZE;
            if (currentCol !== nextCol) return false;
        }

        return true;
    }

    getValidDirections() {
        const directions = [-1, 1, -GRID_SIZE, GRID_SIZE];
        return directions.filter(direction => this.isValidDirection(direction));
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
        this.previousIndex = this.startIndex;
        this.squares[this.currentIndex].classList.add(this.className);
        this.isScared = false;
        this.direction = -1;
    }

    move(deltaTime, pacmanIndex) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.speed) return;
    
        this.timeSinceLastMove = 0;
    
        this.squares[this.currentIndex].classList.remove(this.className);
        this.squares[this.currentIndex].classList.remove('scared-ghost');
    
        const validDirections = this.getValidDirections();
    
        if (validDirections.length > 0) {
            const oppositeDirection = -this.direction;
            const forwardDirections = validDirections.filter(d => d !== oppositeDirection);
            const newDirection = forwardDirections.length > 0
                ? forwardDirections[Math.floor(Math.random() * forwardDirections.length)]
                : validDirections[Math.floor(Math.random() * validDirections.length)];
    
            this.previousIndex = this.currentIndex;
            this.currentIndex += newDirection;
            this.direction = newDirection;
        }
    
        this.squares[this.currentIndex].classList.add(this.className);
        if (this.isScared) {
            this.squares[this.currentIndex].classList.add('scared-ghost');
        }
    }
}