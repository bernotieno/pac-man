import { Board } from './board.js';
import { Pacman } from './pacman.js';
import { Ghost } from './ghost.js';
import { UI } from './ui.js';
import { POWER_PELLET_TIME, GRID_SIZE } from './utils.js';

export class Game {
    constructor() {
        this.board = new Board();
        this.ui = new UI();
        this.pacman = new Pacman(490, this.board);
        this.ghosts = [
            new Ghost('blinky', 348, 250, this.board),
            new Ghost('pinky', 376, 400, this.board),
            new Ghost('inky', 351, 300, this.board),
            new Ghost('clyde', 379, 500, this.board)
        ];
        this.gameOver = false;
        this.powerPelletActive = false;
        this.powerPelletTimer = null;
        this.lastTime = 0;
        this.isPaused = false;

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            } else {
                this.pacman.setDirection(e);
            }
        });
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.ui.createPauseMenu();
        }
    }

    checkCollision() {
        const pacmanIndex = this.pacman.getCurrentIndex();
        
        // Check for pac-dot collision
        if (this.board.getSquares()[pacmanIndex].classList.contains('pac-dot')) {
            this.board.removePacDot(pacmanIndex);
            this.ui.updateScore(10);
        }

        // Check for power pellet collision
        if (this.board.getSquares()[pacmanIndex].classList.contains('power-pellet')) {
            this.board.removePowerPellet(pacmanIndex);
            this.ui.updateScore(50);
            this.powerPelletActive = true;
            this.ghosts.forEach(ghost => ghost.setScared(true));
            
            if (this.powerPelletTimer) clearTimeout(this.powerPelletTimer);
            this.powerPelletTimer = setTimeout(() => {
                this.powerPelletActive = false;
                this.ghosts.forEach(ghost => ghost.setScared(false));
            }, POWER_PELLET_TIME);
        }

        // Check for ghost collision
        this.ghosts.forEach(ghost => {
            if (pacmanIndex === ghost.getCurrentIndex()) {
                if (ghost.isScared) {
                    ghost.reset();
                    this.ui.updateScore(200);
                } else {
                    this.ui.updateLives(this.ui.lives - 1);
                    if (this.ui.lives === 0) {
                        this.gameOver = true;
                    } else {
                        this.resetPositions();
                    }
                }
            }
        });
    }

    resetPositions() {
        this.pacman.reset(490);
        this.ghosts.forEach(ghost => ghost.reset());
    }

    checkWin() {
        if (this.board.checkWin()) {
            this.gameOver = true;
            return true;
        }
        return false;
    }

    update(currentTime) {
        if (this.gameOver || this.isPaused) return;

        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;

        this.pacman.move(deltaTime);
        this.ghosts.forEach(ghost => ghost.move(deltaTime));
        this.checkCollision();
        this.ui.updateTime();
        
        if (this.checkWin()) {
            console.log('You won!');
            return;
        }

        requestAnimationFrame(this.update.bind(this));
    }

    start() {
        requestAnimationFrame(this.update.bind(this));
    }
} 