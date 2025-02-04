import { DIRECTIONS, isValidMove, calculateNextIndex, GRID_SIZE } from './utils.js';

export class Pacman {
    constructor(startIndex, board) {
        this.currentIndex = startIndex;
        this.board = board;
        this.direction = 0;
        this.timeSinceLastMove = 0;
        this.moveDelay = 200; // ms between moves
        this.squares = board.getSquares();
        this.squares[this.currentIndex].classList.add('pac-man');
        this.previousIndex = startIndex;
        this.rotation = 0; // Initial rotation (right)
        this.updateRotation();
    }

    isWall(index) {
        return this.squares[index].classList.contains('wall');
    }

    updateRotation() {
        const pacmanElement = this.squares[this.currentIndex];
        // Remove any existing rotation classes
        pacmanElement.classList.remove('rotate-left', 'rotate-right', 'rotate-up', 'rotate-down');
        
        // Add appropriate rotation class based on direction
        switch(this.direction) {
            case DIRECTIONS.ArrowLeft:
                pacmanElement.classList.add('rotate-left');
                break;
            case DIRECTIONS.ArrowRight:
                pacmanElement.classList.add('rotate-right');
                break;
            case DIRECTIONS.ArrowUp:
                pacmanElement.classList.add('rotate-up');
                break;
            case DIRECTIONS.ArrowDown:
                pacmanElement.classList.add('rotate-down');
                break;
        }
    }

    isValidMove(nextIndex, direction) {
        // Check basic boundaries
        if (nextIndex < 0 || nextIndex >= this.squares.length) return false;

        // Check for walls
        if (this.isWall(nextIndex)) return false;

        // Handle horizontal movement
        if (direction === -1 || direction === 1) {
            const currentRow = Math.floor(this.currentIndex / GRID_SIZE);
            const nextRow = Math.floor(nextIndex / GRID_SIZE);
            
            // Allow tunnel movement
            if (currentRow === nextRow) return true;
            
            // Handle tunnel wrap-around
            if (direction === -1 && this.currentIndex % GRID_SIZE === 0) return true;
            if (direction === 1 && this.currentIndex % GRID_SIZE === GRID_SIZE - 1) return true;
            
            return false;
        }

        // Handle vertical movement
        if (direction === -GRID_SIZE || direction === GRID_SIZE) {
            const currentCol = this.currentIndex % GRID_SIZE;
            const nextCol = nextIndex % GRID_SIZE;
            return currentCol === nextCol;
        }

        return true;
    }

    move(deltaTime) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.moveDelay) return;

        this.timeSinceLastMove = 0;
        
        if (this.direction === 0) return;

        this.squares[this.currentIndex].classList.remove('pac-man', 'rotate-left', 'rotate-right', 'rotate-up', 'rotate-down');
        
        let nextIndex = calculateNextIndex(this.currentIndex, this.direction);

        // Handle tunnel wrap-around
        if (this.direction === -1 && this.currentIndex % GRID_SIZE === 0) {
            nextIndex = this.currentIndex + (GRID_SIZE - 1);
        } else if (this.direction === 1 && this.currentIndex % GRID_SIZE === GRID_SIZE - 1) {
            nextIndex = this.currentIndex - (GRID_SIZE - 1);
        }

        if (this.isValidMove(nextIndex, this.direction)) {
            this.previousIndex = this.currentIndex;
            this.currentIndex = nextIndex;
        }

        this.squares[this.currentIndex].classList.add('pac-man');
        this.updateRotation();
    }

    setDirection(e) {
        const newDirection = DIRECTIONS[e.key];
        if (!newDirection) return;

        const nextIndex = this.currentIndex + newDirection;
        
        // Only change direction if the next move would be valid
        if (this.isValidMove(nextIndex, newDirection)) {
            // If we're currently not moving or moving in the opposite direction,
            // change direction immediately
            if (this.direction === 0 || this.direction === -newDirection) {
                this.direction = newDirection;
                this.updateRotation();
            } else {
                // If we're at an intersection (can move in the new direction),
                // change direction
                if (this.isValidMove(nextIndex, newDirection)) {
                    this.direction = newDirection;
                    this.updateRotation();
                }
            }
        }
    }

    getCurrentIndex() {
        return this.currentIndex;
    }

    reset(startIndex) {
        this.squares[this.currentIndex].classList.remove('pac-man', 'rotate-left', 'rotate-right', 'rotate-up', 'rotate-down');
        this.currentIndex = startIndex;
        this.previousIndex = startIndex;
        this.direction = 0;
        this.squares[this.currentIndex].classList.add('pac-man');
        this.updateRotation();
    }
} 