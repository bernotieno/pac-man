export class UI {
    constructor() {
        this.scoreDisplay = document.getElementById('score');
        this.livesDisplay = document.getElementById('lives');
        this.timeDisplay = document.getElementById('time');
        this.bestScoreDisplay = document.getElementById('bestScore');
        this.score = 0;
        this.lives = 3;
        this.startTime = Date.now();
        this.loadBestScore();
        this.gameStatusDisplay = document.createElement('div');
        this.pauseMenu = null;
        this.gameStatusDisplay.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 48px;
            font-weight: bold;
            color: yellow;
            text-shadow: 2px 2px 4px black;
            z-index: 1000;
            display: none;
        `;
        document.body.appendChild(this.gameStatusDisplay);
    }

    updateScore(points) {
        this.score += points;
        this.scoreDisplay.textContent = this.score;
        this.updateBestScore();
    }

    updateLives(lives) {
        this.lives = lives;
        this.livesDisplay.textContent = lives;
    }

    updateTime() {
        const currentTime = Math.floor((Date.now() - this.startTime) / 1000);
        this.timeDisplay.textContent = currentTime + 's';
    }

    loadBestScore() {
        const bestScore = localStorage.getItem('pacmanBestScore') || 0;
        this.bestScoreDisplay.textContent = bestScore;
    }

    updateBestScore() {
        const currentBestScore = parseInt(localStorage.getItem('pacmanBestScore')) || 0;
        if (this.score > currentBestScore) {
            localStorage.setItem('pacmanBestScore', this.score);
            this.bestScoreDisplay.textContent = this.score;
        }
    }

    createPauseMenu(gameInstance) {
        if (this.pauseMenu) {
            document.body.removeChild(this.pauseMenu);
            this.pauseMenu = null;
            return;
        }

        this.pauseMenu = document.createElement('div');
        this.pauseMenu.className = 'pause-menu';

        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Resume';
        resumeButton.onclick = () => {
            gameInstance.togglePause();
        };

        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.onclick = () => {
            location.reload();
        };

        this.pauseMenu.appendChild(resumeButton);
        this.pauseMenu.appendChild(restartButton);
        document.body.appendChild(this.pauseMenu);
    }
    

    reset() {
        this.score = 0;
        this.lives = 3;
        this.startTime = Date.now();
        this.scoreDisplay.textContent = '0';
        this.livesDisplay.textContent = '3';
        this.timeDisplay.textContent = '0s';
    }

    displayGameStatus(status) {
        // Select the div with class "gameover"
        const gameOverDiv = document.querySelector('.gameover');
        
        // Clear any existing content
        gameOverDiv.innerHTML = '';
        
        // Create and set the status text
        const statusText = document.createElement('div');
        statusText.textContent = status;
        statusText.style.marginBottom = '20px';
        
        // Append text first
        gameOverDiv.appendChild(statusText);
        
        // For "READY" message, don't show the restart button
        if (status !== 'READY') {
            const restartButton = document.createElement('button');
            restartButton.textContent = 'Restart';
            restartButton.classList.add('restart');
            
            // Add click event to restart the game
            restartButton.addEventListener('click', () => {
                location.reload();
            });
            gameOverDiv.appendChild(restartButton);
        }
        
        gameOverDiv.style.display = 'block';
    }

    hideGameStatus() {
        const gameOverDiv = document.querySelector('.gameover');
        gameOverDiv.style.display = 'none';
        gameOverDiv.innerHTML = '';
    }
} 