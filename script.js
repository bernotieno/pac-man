let restartButton = document.createElement("button");
let score = 0;
let toWin = 0;
let lives = 3; // Number of lives the player has
let gameRunning = true; // To check if the game is running or paused
let startTime = 0; // To track the start time of the game
let pauseTime = 0; // To track the time when the game is paused

const width = 28; // 28*28 = 784 squares

document.getElementById("play").addEventListener("click", function game() {
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives");
    const timeDisplay = document.getElementById("time");
    const grid = document.querySelector(".grid")
	startTime= Date.now();
    const layout = [
        1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
        1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
        1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
        1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
        1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
        1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
        1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
        1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
        4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
        1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
        4,0,0,0,0,0,0,1,4,1,0,2,2,2,2,2,2,0,1,4,1,0,0,0,0,0,0,4,
        1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
        4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
        4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
        1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
        1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
        1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
        1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
        1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
        4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
        1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
        1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
        1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 
    // 0 = pac-dot ; 1 = wall ; 2 = ghost-lair ; 3 = power-pellet ; 4 = empty;
    const squares = [];

    // Draw the grid
    function createBoard() {
        for (let i = 0; i < layout.length ; i++){
            const square = document.createElement("div");
            grid.appendChild(square);
            squares.push(square);

            // Add layout to the board
            if (layout[i] === 0) {
                squares[i].classList.add("pac-dot");
            } else if (layout[i] === 1) {
                squares[i].classList.add("wall");
            } else if (layout[i] === 2) {
                squares[i].classList.add("ghost-lair");
            } else if (layout[i] === 3) {
                squares[i].classList.add("power-pellet");
            } else if (layout[i] === 4) {
                squares[i].classList.add("empty");
            }
        }
    }
    createBoard();

    //User's best score
    function bestScoreCount () {
        let higher;
        let bestScore = window.localStorage.getItem(higher);
        window.localStorage.setItem(bestScore, higher);
        const bestScoreDisplay = document.getElementById("bestScore");
        if (bestScore == null) {
            bestScore = score;
            window.localStorage.setItem(higher, bestScore);
        } else if (score < Number(window.localStorage.getItem(higher))) {
            bestScore = score;    
        } else if (score > Number(window.localStorage.getItem(higher))) {
            window.localStorage.clear();
            bestScore = score;
            window.localStorage.setItem(higher, bestScore);
        }
        bestScoreDisplay.innerHTML = window.localStorage.getItem(higher);
    }
    bestScoreCount();

    // Starting position of Pac-Man
    let pacmanCurrentIndex = 518;
    squares[pacmanCurrentIndex].classList.add("pac-man");

    // Move Pac-Man
    let desiredDirection = null; // Store the desired direction
    let lastMoveTime = performance.now(); // Change from Date.now() to performance.now()
    const PACMAN_SPEED = 150; // Time in milliseconds between movements (reduce this value to increase speed)

    // Update the keyboard event listener to handle arrow keys
    document.addEventListener("keydown", (e) => {
        if (!gameRunning) return;

        switch(e.keyCode) {
            case 37: // Left
                desiredDirection = { delta: -1, transform: "scaleX(-1) rotate(95deg)", wrap: 363, wrapTo: 391 };
                break;
            case 38: // Up
                desiredDirection = { delta: -width, transform: "scaleY(1)" };
                break;
            case 39: // Right
                desiredDirection = { delta: 1, transform: "scaleY(1) rotate(95deg)", wrap: 392, wrapTo: 364 };
                break;
            case 40: // Down
                desiredDirection = { delta: width, transform: "rotate(190deg)" };
                break;
        }
    });

    // Update the Pacman movement function
    function updatePacman(currentTime) {
       
        
        if (!desiredDirection || !gameRunning) {
            console.log('Early return - no direction or game not running');
            return;
        }
        
        const timeSinceLastMove = currentTime - lastMoveTime;
        if (timeSinceLastMove < PACMAN_SPEED) {
            return;
        }
        
        lastMoveTime = currentTime;
        const nextIndex = pacmanCurrentIndex + desiredDirection.delta;

        // Check if move is valid
        if (nextIndex >= 0 &&
            nextIndex < squares.length &&
            !squares[nextIndex].classList.contains("wall") &&
            !squares[nextIndex].classList.contains("ghost-lair")) {
            
            // Handle wrapping
            let newPacmanIndex = nextIndex;
            if (desiredDirection.wrap) {
                if (pacmanCurrentIndex === desiredDirection.wrap) {
                    newPacmanIndex = desiredDirection.wrapTo;
                }
            }

            // Update position efficiently
            const currentSquare = squares[pacmanCurrentIndex];
            const newSquare = squares[newPacmanIndex];
            
            currentSquare.classList.remove("pac-man");
            currentSquare.style.transform = "";
            
            pacmanCurrentIndex = newPacmanIndex;
            
            newSquare.classList.add("pac-man");
            newSquare.style.transform = desiredDirection.transform;

            // Check for ghost collision and handle eating scared ghosts
            if (squares[pacmanCurrentIndex].classList.contains("ghost")) {
                const ghostEaten = ghosts.find(ghost =>
                    squares[pacmanCurrentIndex].classList.contains(ghost.className)
                );
                
                if (ghostEaten && ghostEaten.isScared) {
                    squares[pacmanCurrentIndex].classList.remove(ghostEaten.className, "ghost", "scared-ghost");
                    ghostEaten.currentIndex = ghostEaten.startIndex;
                    score += 100;
                    scoreDisplay.innerHTML = score;
                }
            }

            // Game logic
            pacDotEaten();
            powerPelletEaten();
            checkForGameOver();
            checkForWin();
        }
    }

    // Update the game loop to ensure it's running
    function gameLoop(currentTime) {
        if (!gameRunning) return;

        updatePacman(currentTime);  // Pass the currentTime from requestAnimationFrame

        // Update displays less frequently (every 4 frames)
        if (currentTime % 4 === 0) {
            scoreDisplay.innerHTML = score;
            timeDisplay.innerHTML = `Time: ${Math.floor((Date.now() - startTime) / 1000)}s`;
        }

        requestAnimationFrame(gameLoop);
    }

    // Make sure the game loop starts correctly
    gameRunning = true;
    lastMoveTime = performance.now();  // Initialize with performance.now()
    requestAnimationFrame(gameLoop);

    // When Pac-Man eats a Pac-Dot
    function pacDotEaten() {
        if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
            score++;
            toWin++;
            squares[pacmanCurrentIndex].classList.remove("pac-dot");
        }
        scoreDisplay.innerHTML = score;
    }

    // When Pac-Man eats a Power-Pellet
    function powerPelletEaten () {
        if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
            score += 10;
            toWin += 10;
            ghosts.forEach(ghost => ghost.isScared = true);
            setTimeout(unScareGhosts, 7000);
            squares[pacmanCurrentIndex].classList.remove("power-pellet");
        }
        scoreDisplay.innerHTML = score;
    }

    // Create Ghost template
    class Ghost {
        constructor(className, startIndex, speed) {
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.isScared = false;
            this.lastUpdate = 0;
            this.animationId = null;
        }
    
        stopMovement() {
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        }
    }
    

    const ghosts = [
        new Ghost("blinky", 348, 290),  // Scaled down from 290
        new Ghost("pinky", 376, 380),   // Scaled down from 380
        new Ghost("inky", 351, 200),    // Scaled down from 200
        new Ghost("clyde", 379, 250)    // Scaled down from 250
    ];
        
    // Give back their colors to the ghosts
    function unScareGhosts () {ghosts.forEach(ghost => ghost.isScared = false)}
    
    // Draw the ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    })

    

    function moveGhost(ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        
        function updateGhost() {
            if (!gameRunning) {
                ghost.animationId = requestAnimationFrame(updateGhost);
                return;
            }

            const currentTime = Date.now();
            if (currentTime - ghost.lastUpdate < ghost.speed) {
                ghost.animationId = requestAnimationFrame(updateGhost);
                return;
            }

            ghost.lastUpdate = currentTime;

            // Remove previous ghost position
            squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");

            // Try to move in current direction or get new direction
            if (!squares[ghost.currentIndex + direction].classList.contains("ghost") && 
                !squares[ghost.currentIndex + direction].classList.contains("wall")) {
                ghost.currentIndex += direction;
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)];
            }

            // Handle tunnel wrapping
            if (ghost.currentIndex === 363) ghost.currentIndex = 391;
            else if (ghost.currentIndex === 391) ghost.currentIndex = 363;
            else if (ghost.currentIndex === 392) ghost.currentIndex = 364;
            else if (ghost.currentIndex === 364) ghost.currentIndex = 392;

            // Add ghost to new position
            squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
            }

            ghost.animationId = requestAnimationFrame(updateGhost);
        }

        ghost.animationId = requestAnimationFrame(updateGhost);
    }

    // Initialize ghost movement
    ghosts.forEach(ghost => {
        ghost.lastUpdate = Date.now();
        moveGhost(ghost);
    });

    // Check for Game Over
    function checkForGameOver() {
        if (squares[pacmanCurrentIndex].classList.contains("ghost") && 
            !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            lives--;
            livesDisplay.innerHTML = lives;
            gameRunning = false;
            
            if (lives === 0) {
                // Stop all ghost animations
                ghosts.forEach(ghost => ghost.stopMovement());
                document.removeEventListener("keydown", updatePacman);
                bestScoreCount();
                scoreDisplay.innerHTML = score;
                let gameOver = document.createElement("div");
                gameOver.classList.add("gameOver");
                document.body.append(gameOver);
                restartButton.classList.add("restart");
                document.body.append(restartButton);
                document.getElementById("play").removeEventListener("click", game);
                restartButton.addEventListener("click", () => {window.location.reload(false)});
            } else {
                // Reset Pac-Man and ghosts positions
                gameRunning = true;
                squares[pacmanCurrentIndex].classList.remove("pac-man");
                pacmanCurrentIndex = 518;
                squares[pacmanCurrentIndex].classList.add("pac-man");
                
                ghosts.forEach(ghost => {
                    squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                    ghost.currentIndex = ghost.startIndex;
                    squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
                });
            }
        }
    }

    // Check for Win
    function checkForWin () {
        if (toWin === 372) {
            ghosts.forEach(ghost => clearInterval(ghost.timerId));
            document.removeEventListener("keydown", updatePacman);
            bestScoreCount();
            scoreDisplay.innerHTML = score;
            let youWon = document.createElement("div");
            youWon.classList.add("won");
            document.body.append(youWon);
            restartButton.classList.add("restart");
            document.body.append(restartButton);
            document.getElementById("play").removeEventListener("click", game);
            restartButton.addEventListener("click", () => {window.location.reload(false)})
        }
    }

    // Pause Menu
    function createPauseMenu() {
        const pauseMenu = document.createElement("div");
        pauseMenu.classList.add("pause-menu");

        const continueButton = document.createElement("button");
        continueButton.innerText = "Continue";
        continueButton.addEventListener("click", () => {
            gameRunning = true;
            startTime += (Date.now() - pauseTime); // Adjust the start time to account for the pause
            pauseMenu.remove();
        });

        const restartButton = document.createElement("button");
        restartButton.innerText = "Restart";
        restartButton.addEventListener("click", () => {
            window.location.reload(false);
        });

        pauseMenu.appendChild(continueButton);
        pauseMenu.appendChild(restartButton);
        document.body.appendChild(pauseMenu);
    }

    // Pause the game
    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) { // ESC key
            if (gameRunning) {
                gameRunning = false;
                pauseTime = Date.now();
                createPauseMenu();
            } else {
                gameRunning = true;
                startTime += (Date.now() - pauseTime); // Adjust start time
                document.querySelector(".pause-menu").remove();
            }
        }
    });

    // Update the time display
    function updateTime() {
        if (gameRunning) {
            const currentTime = Math.floor((Date.now() - startTime) / 1000);
            timeDisplay.innerHTML = `Time: ${currentTime}s`;
        }
        requestAnimationFrame(updateTime);
    }
});