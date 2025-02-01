let restartButton = document.createElement("button");
let score = 0;
let toWin = 0;
let lives = 3; // Number of lives the player has
let gameRunning = true; // To check if the game is running or paused
let startTime = 0; // To track the start time of the game
let pauseTime = 0; // To track the time when the game is paused

document.getElementById("play").addEventListener("click", function game() {
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives");
    const timeDisplay = document.getElementById("time");
    const width = 28; // 28*28 = 784 squares
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
    function movePacman (e) {
        if (!gameRunning) return; // Do not move Pac-Man if the game is paused

        squares[pacmanCurrentIndex].classList.remove("pac-man");
        switch(e.keyCode){
            case 37:
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex -=1;
                    squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
                    // If Pac-Man is on the left exit
                    if (pacmanCurrentIndex - 1 === 363) {
                        pacmanCurrentIndex = 391;
                }}
                break;
            case 38:
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { 
                    pacmanCurrentIndex -= width;
                    squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
                }
                break;
            case 39:
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ 
                    pacmanCurrentIndex += 1;
                    squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
                    // If Pac-Man is on the right exit
                    if(pacmanCurrentIndex + 1 === 392) {
                        pacmanCurrentIndex = 364;
                }}
                break;
            case 40:
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex += width;
                    squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
                }
                break;
        }

        squares[pacmanCurrentIndex].classList.add("pac-man");

        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }

    document.addEventListener("keydown", movePacman);

    // Move Pac-Man on mobile devices (Swipe up-down-left-right)
    var initialX = null;
    var initialY = null;

    function startTouch (e) {
        initialX = e.touches[0].clientX;
        initialY = e.touches[0].clientY;
    } 
    
    function moveTouch (e) {
        if (!gameRunning) return; // Do not move Pac-Man if the game is paused

        if (initialX === null){
            return;
        }
        if (initialY === null){
            return;
        }
        
        var currentX = e.touches[0].clientX;
        var currentY = e.touches[0].clientY;
        var diffX = initialX - currentX;
        var diffY = initialY - currentY;
    
        squares[pacmanCurrentIndex].classList.remove("pac-man");
    
        if (Math.abs(diffX) > Math.abs(diffY)){
            if (diffX > 0) {
                // Swipe Left
                if (pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains("wall") && !squares[pacmanCurrentIndex -1].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex -=1;
                    squares[pacmanCurrentIndex].style.transform = "scaleX(-1) rotate(95deg)";
                    // If Pac-Man is on the left exit
                    if (pacmanCurrentIndex - 1 === 363) {
                        pacmanCurrentIndex = 391;
                }}
            } else {
                // Swipe Right
                if (pacmanCurrentIndex % width < width - 1 && !squares[pacmanCurrentIndex +1].classList.contains("wall") && !squares[pacmanCurrentIndex +1].classList.contains("ghost-lair")){ pacmanCurrentIndex += 1;
                    squares[pacmanCurrentIndex].style.transform = "scaleY(1) rotate(95deg)";
                    // If Pac-Man is on the right exit
                    if(pacmanCurrentIndex + 1 === 392) {
                        pacmanCurrentIndex = 364;
                }}
            }
        } else {
            if (diffY > 0){
                // Swipe Up
                if (pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex - width].classList.contains("wall") && !squares[pacmanCurrentIndex - width].classList.contains("ghost-lair")) { pacmanCurrentIndex -= width;
                    squares[pacmanCurrentIndex].style.transform = "scaleY(1)";
                }
            } else {
                // Swipe Down
                if (pacmanCurrentIndex + width < width * width && !squares[pacmanCurrentIndex + width].classList.contains("wall") && !squares[pacmanCurrentIndex + width].classList.contains("ghost-lair")) {
                    pacmanCurrentIndex += width;
                    squares[pacmanCurrentIndex].style.transform = "rotate(190deg)";
                }
            }
        }
        squares[pacmanCurrentIndex].classList.add("pac-man");
        initialX = null;
        initialY = null;
        
        e.preventDefault();
    
        pacDotEaten();
        powerPelletEaten();
        checkForGameOver();
        checkForWin();
    }
    
    document.querySelector(".grid").addEventListener("touchstart", startTouch, false);
    document.querySelector(".grid").addEventListener("touchmove", moveTouch, false);

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
        constructor(className, startIndex, speed){
            this.className = className;
            this.startIndex = startIndex;
            this.speed = speed;
            this.currentIndex = startIndex;
            this.timerId = NaN;
            this.isScared = false;
        }
    }

    const ghosts = [
        new Ghost("blinky", 348, 290),
        new Ghost("pinky", 376, 380),
        new Ghost("inky", 351, 200),
        new Ghost("clyde", 379, 250)
    ]
        
    // Give back their colors to the ghosts
    function unScareGhosts () {ghosts.forEach(ghost => ghost.isScared = false)}
    
    // Draw the ghosts onto the grid
    ghosts.forEach(ghost => {
        squares[ghost.currentIndex].classList.add(ghost.className);
        squares[ghost.currentIndex].classList.add("ghost");
    })

    // Move the ghosts 
    ghosts.forEach(ghost => moveGhost(ghost));

    function moveGhost (ghost) {
        const directions = [-1, +1, width, -width];
        let direction = directions[Math.floor(Math.random() * directions.length)];
        ghost.timerId = setInterval(function () {
            if (!gameRunning) return; // Do not move ghosts if the game is paused

            if (!squares[ghost.currentIndex + direction].classList.contains("ghost") && !squares[ghost.currentIndex + direction].classList.contains("wall")) {
                squares[ghost.currentIndex].classList.remove(ghost.className);
                squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
                ghost.currentIndex += direction;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            } else if (ghost.currentIndex - 1 === 363) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
                ghost.currentIndex = 391;
                squares[ghost.currentIndex].classList.add("ghost");
            } else if (ghost.currentIndex + 1 === 392) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
                ghost.currentIndex = 364;
                squares[ghost.currentIndex].classList.add("ghost");
            } else {
                direction = directions[Math.floor(Math.random() * directions.length)]
            }

            if (ghost.isScared) {
                squares[ghost.currentIndex].classList.add("scared-ghost");
            }

            if (squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
                squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
                ghost.currentIndex = ghost.startIndex;
                score += 100;
                scoreDisplay.innerHTML = score;
                squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
            }
                
            checkForGameOver();
        }, ghost.speed)
    }

    // Check for Game Over
    function checkForGameOver () {
        if (squares[pacmanCurrentIndex].classList.contains("ghost") && !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
            lives--;
            livesDisplay.innerHTML = lives;
			gameRunning= false;
            if (lives === 0) {
                ghosts.forEach(ghost => clearInterval(ghost.timerId));
                document.removeEventListener("keydown", movePacman);
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
			gameRunning= true;

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
            document.removeEventListener("keydown", movePacman);
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

    updateTime();
});