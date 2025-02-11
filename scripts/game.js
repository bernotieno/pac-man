import { Board } from './board.js';
import { Pacman } from './pacman.js';
import { Blinky } from './blinky.js';
import { Pinky } from './pinky.js';
import { Inky } from './inky.js';
import { Clyde } from './clyde.js';
import { UI } from './ui.js';
import { POWER_PELLET_TIME } from './utils.js';

export class Game {
    static initialize() {
        const playButton = document.getElementById('play');
            
        function startGame() {
            playButton.style.display = 'none';
            document.getElementById('h2bestScore').style.display = 'block';
            document.getElementById('mobile').style.display = 'none';

            const game = new Game();
            game.start();
        }

        // Click handler
        playButton.addEventListener('click', startGame);

        // Enter key handler
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && playButton.style.display !== 'none') {
                startGame();
            }
        });
    }

    constructor() {
        this.board = new Board();
        this.ui = new UI();
        this.pacman = new Pacman(490, this.board);
        this.ghosts = [
            new Blinky(348, 250, this.board),
            new Pinky(376, 400, this.board),
            new Inky(351, 300, this.board),
            new Clyde(379, 500, this.board)
        ];
        this.gameOver = false;
        this.powerPelletActive = false;
        this.powerPelletTimer = null;
        this.lastTime = 0;
        this.isPaused = false;

        // document.addEventListener('keydown', (e) => {
        //     if (e.key === 'Escape') {
        //         this.togglePause();
        //     } else {
        //         this.pacman.setDirection(e);
        //     }
        // });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.togglePause();
            } else if (e.key === 'Enter' && this.isPaused) {
                location.reload(); // Restart only when game is paused
            } else {
                this.pacman.setDirection(e);
            }
        });
        
    }

    togglePause() {
        this.isPaused = !this.isPaused;
        if (this.isPaused) {
            this.ui.createPauseMenu(this);
        } else {
            this.ui.createPauseMenu(this); // This will remove the pause menu
            requestAnimationFrame(this.update.bind(this)); // Resume game loop
        }
    }

    restartGame() {
        if (this.gameOver || this.isPaused) {
            // Restart game when paused or game over
            this.resetGame();
            this.start();
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
                        this.ui.displayGameStatus('GAME OVER');
                    } else {
                        this.resetPositions();
                        this.isPaused = true; // Pause the game
                        this.ui.displayGameStatus('READY');
                        
                        // Resume the game after 2 seconds
                        setTimeout(() => {
                            const gameOverDiv = document.querySelector('.gameover');
                            gameOverDiv.style.display = 'none';
                            this.isPaused = false; // Resume the game
                            this.moveGhosts(); // Restart ghost movement
                        }, 2000);
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
        if (this.ui.lives <= 0) {
            this.gameOver = true;
            this.ui.displayGameStatus('GAME OVER');
            return true;
        }
        
        // Check if all pellets are eaten
        if (this.board.checkWin()) {
            this.gameOver = true;
            this.ui.displayGameStatus('YOU WON!');
            return true;
        }
        
        return false;
    }

    update(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
    
        if (!this.isPaused && !this.gameOver) {
            const pacmanIndex = this.pacman.getCurrentIndex();
    
            this.pacman.move(deltaTime);
            this.ghosts.forEach(ghost => {
                ghost.move(deltaTime, pacmanIndex);
            });
    
            this.checkCollision();
            this.ui.updateTime();
    
            if (this.checkWin()) {
                console.log('You won!');
                return;
            }
        }
    
        requestAnimationFrame(this.update.bind(this)); // Keep running regardless of pause state
    }

    start() {
        // Show "Ready" message
        this.ui.displayGameStatus('READY');
        
        // Start the game after 3 seconds
        setTimeout(() => {
            // Hide the "Ready" message
            this.ui.hideGameStatus();
            // Start the game loop
            requestAnimationFrame(this.update.bind(this));
        }, 3000);
    }
}