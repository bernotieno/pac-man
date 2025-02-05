import { Board } from './board.js';
import { Pacman } from './pacman.js';
// import { Blinky } from './blinky.js';
import { Pinky } from './pinky.js';
// import { Inky } from './inky.js';
// import { Clyde } from './clyde.js';
import { UI } from './ui.js';
import { POWER_PELLET_TIME } from './utils.js';

export class Game {
    constructor() {
        this.board = new Board();
        this.ui = new UI();
        this.pacman = new Pacman(490, this.board);
        this.ghosts = [
            // new Blinky(348, 250, this.board),
            new Pinky(376, 400, this.board),
            // new Inky(351, 300, this.board),
            // new Clyde(379, 500, this.board)
        ];
        
        // Game state
        this.gameOver = false;
        this.powerPelletActive = false;
        this.powerPelletTimer = null;
        this.lastTime = 0;
        this.isPaused = false;
        
        // Performance optimization variables
        this.accumulator = 0;
        this.timestep = 1000/60; // 60 FPS
        this.uiUpdateInterval = 1000; // Update UI every second
        this.lastUIUpdate = 0;
        
        // Cache DOM elements
        this.squares = this.board.getSquares();
        
        // Bind methods to avoid creating new functions
        this.boundUpdate = this.update.bind(this);
        this.boundHandleKeydown = this.handleKeydown.bind(this);
        
        // Event listeners
        document.addEventListener('keydown', this.boundHandleKeydown);
    }

    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.togglePause();
        } else {
            this.pacman.setDirection(e);
        }
    }

    cleanup() {
        // Remove event listeners to prevent memory leaks
        document.removeEventListener('keydown', this.boundHandleKeydown);
        if (this.powerPelletTimer) {
            clearTimeout(this.powerPelletTimer);
        }
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.ui.createPauseMenu();
        }
    }

    update(currentTime) {
        if (this.gameOver || this.isPaused) return;

        // Calculate delta time with upper bound to prevent spiral of death
        const deltaTime = Math.min(currentTime - this.lastTime, this.timestep * 2);
        this.lastTime = currentTime;
        this.accumulator += deltaTime;

        // Fixed timestep updates
        const maxSteps = 3; // Prevent spiral of death
        let steps = 0;
        while (this.accumulator >= this.timestep && steps < maxSteps) {
            this.updateGameLogic(this.timestep);
            this.accumulator -= this.timestep;
            steps++;
        }

        // Update UI at fixed intervals
        if (currentTime - this.lastUIUpdate >= this.uiUpdateInterval) {
            this.ui.updateTime();
            this.lastUIUpdate = currentTime;
        }

        if (this.checkWin()) {
            this.cleanup();
            console.log('You won!');
            return;
        }

        requestAnimationFrame(this.boundUpdate);
    }

    updateGameLogic(deltaTime) {
        // Cache pacman position and direction for multiple uses
        const pacmanIndex = this.pacman.getCurrentIndex();
        const pacmanDirection = this.pacman.getCurrentDirection();
        
        // Update entities
        this.pacman.move(deltaTime);
        
        // Batch ghost updates
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].move(deltaTime, pacmanIndex, pacmanDirection);
        }

        this.checkCollision(pacmanIndex);
    }

    checkCollision(pacmanIndex) {
        // Use cached squares
        const currentSquare = this.squares[pacmanIndex];
        
        // Use classList.contains only once per class
        const hasPacDot = currentSquare.classList.contains('pac-dot');
        const hasPowerPellet = currentSquare.classList.contains('power-pellet');
        
        if (hasPacDot) {
            this.board.removePacDot(pacmanIndex);
            this.ui.updateScore(10);
        }

        if (hasPowerPellet) {
            this.board.removePowerPellet(pacmanIndex);
            this.ui.updateScore(50);
            this.activatePowerPellet();
        }

        // Single loop for ghost collisions
        for (let i = 0; i < this.ghosts.length; i++) {
            const ghost = this.ghosts[i];
            if (pacmanIndex === ghost.getCurrentIndex()) {
                if (ghost.isScared) {
                    ghost.reset();
                    this.ui.updateScore(200);
                } else {
                    this.handlePacmanDeath();
                }
                break; // Exit loop after first collision
            }
        }
    }

    activatePowerPellet() {
        this.powerPelletActive = true;
        
        // Batch update ghost states
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].setScared(true);
        }

        if (this.powerPelletTimer) clearTimeout(this.powerPelletTimer);
        this.powerPelletTimer = setTimeout(() => {
            this.powerPelletActive = false;
            for (let i = 0; i < this.ghosts.length; i++) {
                this.ghosts[i].setScared(false);
            }
        }, POWER_PELLET_TIME);
    }

    handlePacmanDeath() {
        this.ui.updateLives(this.ui.lives - 1);
        if (this.ui.lives === 0) {
            this.gameOver = true;
            this.cleanup();
        } else {
            this.resetPositions();
        }
    }

    resetPositions() {
        this.pacman.reset(490);
        for (let i = 0; i < this.ghosts.length; i++) {
            this.ghosts[i].reset();
        }
    }

    checkWin() {
        if (this.board.checkWin()) {
            this.gameOver = true;
            return true;
        }
        return false;
    }

    start() {
        this.lastTime = performance.now();
        requestAnimationFrame(this.boundUpdate);
    }
}