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
        // Create a game status display element
        this.gameStatusDisplay = document.createElement('div');
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
        const pauseMenu = document.createElement('div');
        pauseMenu.className = 'pause-menu';
    
        const resumeButton = document.createElement('button');
        resumeButton.textContent = 'Resume';
        resumeButton.onclick = () => {
            document.body.removeChild(pauseMenu);
            gameInstance.togglePause(); // Resume game
        };
    
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Restart';
        restartButton.onclick = () => {
            location.reload();
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

    displayGameStatus(status) {
    // Select the div with class "gameover"
    const gameOverDiv = document.querySelector('.gameover');
    
    // Clear any existing content
    gameOverDiv.innerHTML = '';
    
    // Create and set the status text
    const statusText = document.createElement('div');
    statusText.textContent = status;
    statusText.style.marginBottom = '20px'; // Add some spacing before the button
    
    // Create the restart button
    const restartButton = document.createElement('button');
    restartButton.textContent = 'Restart';
    restartButton.classList.add('restart'); // Add the restart class
    
    // Add click event to restart the game
    restartButton.addEventListener('click', () => {
        location.reload(); // Reloads the page
    });
    
    // Append text and button to the game over div
    gameOverDiv.appendChild(statusText);
    gameOverDiv.appendChild(restartButton);
    
    // Make the div visible
    gameOverDiv.style.display = 'block';
    }
} 