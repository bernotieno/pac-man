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

    createPauseMenu() {
        const pauseMenu = document.createElement('div');
        pauseMenu.className = 'pause-menu';
        
        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Resume';
        resumeButton.onclick = () => {
            document.body.removeChild(pauseMenu);
            return false;
        };
        
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.onclick = () => {
            location.reload();
            return false;
        };
        
        pauseMenu.appendChild(resumeButton);
        pauseMenu.appendChild(restartButton);
        document.body.appendChild(pauseMenu);
    }

    reset() {
        this.score = 0;
        this.lives = 3;
        this.startTime = Date.now();
        this.scoreDisplay.textContent = '0';
        this.livesDisplay.textContent = '3';
        this.timeDisplay.textContent = '0s';
    }
} 