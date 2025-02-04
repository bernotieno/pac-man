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
        
        // Basic boundary checks
        if (nextIndex < 0 || nextIndex >= this.squares.length) return false;
        
        // Check for walls
        if (this.isWall(nextIndex)) return false;
        
        // Check for other ghosts
        if (this.squares[nextIndex].classList.contains('ghost') && !this.isGhostLair(nextIndex)) return false;
        
        // Handle horizontal movement
        if (direction === -1 || direction === 1) {
            // Prevent moving through walls horizontally
            const currentRow = Math.floor(this.currentIndex / GRID_SIZE);
            const nextRow = Math.floor(nextIndex / GRID_SIZE);
            if (currentRow !== nextRow) return false;
        }
        
        // Handle vertical movement
        if (direction === -GRID_SIZE || direction === GRID_SIZE) {
            // Prevent moving through walls vertically
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

    move(deltaTime, pacmanIndex) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.speed) return;
    
        this.timeSinceLastMove = 0;
    
        // Remove ghost appearance at the current position
        this.squares[this.currentIndex].classList.remove(this.className);
        this.squares[this.currentIndex].classList.remove('scared-ghost');
    
        const validDirections = this.getValidDirections();
    
        if (validDirections.length > 0) {
            let newDirection;
    
            // Blinky's movement optimization
            if (this.className === 'blinky') {
                const targetIndex = this.calculateBlinkyTarget(pacmanIndex);
    
                // Find the direction that minimizes the distance to Pac-Man
                newDirection = validDirections.reduce((bestDirection, direction) => {
                    const nextIndex = this.currentIndex + direction;
                    const bestDistance = Math.abs(targetIndex % GRID_SIZE - (this.currentIndex % GRID_SIZE + bestDirection % GRID_SIZE)) +
                                         Math.abs(Math.floor(targetIndex / GRID_SIZE) - Math.floor((this.currentIndex + bestDirection) / GRID_SIZE));
                    const newDistance = Math.abs(targetIndex % GRID_SIZE - nextIndex % GRID_SIZE) +
                                        Math.abs(Math.floor(targetIndex / GRID_SIZE) - Math.floor(nextIndex / GRID_SIZE));
    
                    return newDistance < bestDistance ? direction : bestDirection;
                }, validDirections[0]);
            } else {
                // Default movement logic for other ghosts
                const oppositeDirection = -this.direction;
                const forwardDirections = validDirections.filter(d => d !== oppositeDirection);
                newDirection = forwardDirections.length > 0
                    ? forwardDirections[Math.floor(Math.random() * forwardDirections.length)]
                    : validDirections[Math.floor(Math.random() * validDirections.length)];
            }
    
            this.previousIndex = this.currentIndex;
            this.currentIndex += newDirection;
            this.direction = newDirection;
        }
    
        // Add ghost appearance at the new position
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

    calculateBlinkyTarget(pacmanIndex) {
        return pacmanIndex; // Blinky's target is always Pac-Man's current index
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
} 