import { Ghost } from './ghost-base.js';
import { GRID_SIZE } from './utils.js';

export class Blinky extends Ghost {
    constructor(startIndex, speed, board) {
        super('blinky', startIndex, speed, board);
        this.ghostHouseExit = 348;
        this.isInGhostHouse = true;
        this.lastCalculationTime = 0;
        this.calculationInterval = 16;
        this.cachedDirection = null;
        // Directions mapped for quick access
        this.DIRECTIONS = {
            UP: -GRID_SIZE,
            DOWN: GRID_SIZE,
            LEFT: -1,
            RIGHT: 1
        };
    }

    calculateBlinkyTarget(pacmanIndex) {
        // Classic Blinky behavior: Target Pac-Man's current tile directly
        if (this.isInGhostHouse) {
            return this.ghostHouseExit;
        }
        return pacmanIndex;
    }

    calculateDistance(start, end) {
        // Optimized Manhattan distance calculation
        const startX = start % GRID_SIZE;
        const startY = start / GRID_SIZE | 0;
        const endX = end % GRID_SIZE;
        const endY = end / GRID_SIZE | 0;
        
        return Math.abs(endX - startX) + Math.abs(endY - startY);
    }

    findBestDirection(validDirections, targetIndex) {
        // Ghost house priority
        if (this.isInGhostHouse && validDirections.includes(this.DIRECTIONS.UP)) {
            return this.DIRECTIONS.UP;
        }

        let bestDirection = validDirections[0];
        let bestScore = Number.MAX_SAFE_INTEGER;

        // Optimize loop for better performance
        const directionsLength = validDirections.length;
        for (let i = 0; i < directionsLength; i++) {
            const direction = validDirections[i];
            const nextIndex = this.currentIndex + direction;
            
            // Skip reverse direction unless it's the only option
            if (nextIndex === this.previousIndex && directionsLength > 1) {
                continue;
            }

            const score = this.calculateDistance(nextIndex, targetIndex) * 10;
            
            let finalScore = score;
            
            if (!this.isInGhostHouse) {
                if (this.isGhostLair(nextIndex)) {
                    finalScore += 1000;
                }
                if (direction === -this.direction) {
                    finalScore += 500;
                }

                if (direction === this.direction) {
                    finalScore -= 5;
                }
            }

            if (finalScore < bestScore) {
                bestScore = finalScore;
                bestDirection = direction;
            }
        }

        return bestDirection;
    }

    move(deltaTime, pacmanIndex) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.speed) return;

        // Throttle pathfinding calculations
        const currentTime = performance.now();
        const shouldRecalculate = currentTime - this.lastCalculationTime >= this.calculationInterval;

        // Remove classes only once per move
        this.squares[this.currentIndex].classList.remove(this.className, 'scared-ghost');

        // Update ghost house status
        this.isInGhostHouse = this.isGhostLair(this.currentIndex);

        const validDirections = this.getValidDirections();

        if (validDirections.length > 0) {
            let newDirection;

            if (shouldRecalculate) {
                let targetIndex;
                
                if (this.isScared) {
                    // Optimized scatter target calculation
                    const oppositeX = GRID_SIZE - 1 - (pacmanIndex % GRID_SIZE);
                    const oppositeY = GRID_SIZE - 1 - (pacmanIndex / GRID_SIZE | 0);
                    targetIndex = (oppositeY * GRID_SIZE + oppositeX) | 0;
                } else {
                    targetIndex = this.calculateBlinkyTarget(pacmanIndex);
                }

                newDirection = this.findBestDirection(validDirections, targetIndex);
                this.cachedDirection = newDirection;
                this.lastCalculationTime = currentTime;
            } else {
                newDirection = this.cachedDirection || this.findBestDirection(validDirections, this.calculateBlinkyTarget(pacmanIndex));
            }

            // Update position
            this.previousIndex = this.currentIndex;
            this.currentIndex += newDirection;
            this.direction = newDirection;
        }

        // Add classes in new position
        this.squares[this.currentIndex].classList.add(this.className);
        if (this.isScared) {
            this.squares[this.currentIndex].classList.add('scared-ghost');
        }

        this.timeSinceLastMove = 0;
    }
}