import { Ghost } from './ghost-base.js';

export class Pinky extends Ghost {
    constructor(startIndex, speed, board) {
        super('pinky', startIndex, speed, board);
        // Pre-calculate offsets for each direction (x, y)
        this.targetOffsets = {
            UP: [-4, -4],    // Original bug: 4 left and 4 up
            DOWN: [0, 4],     // 4 tiles down
            LEFT: [-4, 0],    // 4 tiles left
            RIGHT: [4, 0]     // 4 tiles right
        };
        this.lastPacmanPos = null;
        this.lastPacmanDir = null;
        this.timeSinceLastMove = 0;
        this.lastCalculationTime = 0;
        this.calculationInterval = 16;
        this.cachedDirection = null;
        this.ghostHouseExit = 348; // Add ghost house exit index
        this.isInGhostHouse = true; // Track ghost house state
    }

    calculateTargetTile(pacmanIndex, pacmanDirection) {
        const pacmanX = pacmanIndex % this.board.width;
        const pacmanY = Math.floor(pacmanIndex / this.board.width);
        
        // Use the passed direction instead of hardcoding
        const pacmanDir = pacmanDirection || 'RIGHT';

        // Skip recalculation if Pac-Man hasn't moved
        if (this.lastPacmanPos && 
            this.lastPacmanPos.x === pacmanX && 
            this.lastPacmanPos.y === pacmanY &&
            this.lastPacmanDir === pacmanDir) {
            return this.currentTarget;
        }

        // Update last known positions and direction
        this.lastPacmanPos = { x: pacmanX, y: pacmanY };
        this.lastPacmanDir = pacmanDir;

        // Get the offset for current direction
        const [offsetX, offsetY] = this.targetOffsets[pacmanDir];

        // Calculate target position with boundary checks
        return {
            x: Math.max(0, Math.min(pacmanX + offsetX, this.board.width - 1)),
            y: Math.max(0, Math.min(pacmanY + offsetY, this.board.height - 1))
        };
    }

    move(deltaTime, pacmanIndex, pacmanDirection) {
        this.timeSinceLastMove += deltaTime;
        if (this.timeSinceLastMove < this.speed) return;

        // Remove classes
        this.squares[this.currentIndex].classList.remove(this.className, 'scared-ghost');

        const validDirections = this.getValidDirections();

        // Update ghost house status
        this.isInGhostHouse = this.squares[this.currentIndex].classList.contains('ghost-lair');

        if (validDirections.length > 0) {
            let newDirection;

            if (this.isInGhostHouse) {
                // When in ghost house, prioritize moving upward to exit
                newDirection = validDirections.includes(-this.board.width) ? 
                    -this.board.width : validDirections[0];
            } else {
                const currentTime = performance.now();
                const shouldRecalculate = currentTime - this.lastCalculationTime >= this.calculationInterval;

                if (shouldRecalculate) {
                    const targetTile = this.isScared ? 
                        this.getScatterTarget() : 
                        this.calculateTargetTile(pacmanIndex, pacmanDirection);
                    
                    newDirection = this.findBestDirection(validDirections, targetTile);
                    this.cachedDirection = newDirection;
                    this.lastCalculationTime = currentTime;
                } else {
                    newDirection = this.cachedDirection || this.findBestDirection(validDirections, this.calculateTargetTile(pacmanIndex, pacmanDirection));
                }
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

    findBestDirection(validDirections, targetTile) {
        // If in ghost house, prioritize moving upward
        if (this.isInGhostHouse) {
            const upDirection = -this.board.width;
            if (validDirections.includes(upDirection)) {
                return upDirection;
            }
        }

        let bestDirection = validDirections[0];
        let bestDistance = Number.MAX_SAFE_INTEGER;

        for (const direction of validDirections) {
            const nextIndex = this.currentIndex + direction;
            const nextX = nextIndex % this.board.width;
            const nextY = Math.floor(nextIndex / this.board.width);
            
            // Prevent reversing direction unless it's the only option
            if (direction === -this.direction && validDirections.length > 1) {
                continue;
            }
            
            // Add penalty for ghost house tiles when not in ghost house
            let distance = Math.abs(nextX - targetTile.x) + Math.abs(nextY - targetTile.y);
            if (!this.isInGhostHouse && this.squares[nextIndex].classList.contains('ghost-lair')) {
                distance += 1000; // Large penalty for re-entering ghost house
            }
            
            if (distance < bestDistance) {
                bestDistance = distance;
                bestDirection = direction;
            }
        }

        return bestDirection;
    }

    // Override scatter mode target if needed
    getScatterTarget() {
        // Top-right corner is Pinky's scatter target
        return {
            x: this.board.width - 1,
            y: 0
        };
    }
}