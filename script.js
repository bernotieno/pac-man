// let restartButton = document.createElement("button");
// let score = 0;
// let toWin = 0;
// let lives = 3; // Number of lives the player has
// let gameRunning = true; // To check if the game is running or paused
// let startTime = 0; // To track the start time of the game
// let pauseTime = 0; // To track the time when the game is paused

// document.getElementById("play").addEventListener("click", function game() {
//     const scoreDisplay = document.getElementById("score");
//     const livesDisplay = document.getElementById("lives");
//     const timeDisplay = document.getElementById("time");
//     const width = 28; // 28*28 = 784 squares
//     const grid = document.querySelector(".grid")
// 	startTime= Date.now();
//     const layout = [
//         1,1,1,1,1,1,1,1,4,4,1,1,1,4,4,1,1,1,1,1,1,1,1,1,1,1,1,1,
//         1,0,0,0,0,0,0,1,4,4,1,3,1,4,4,1,0,0,0,0,0,0,0,0,0,0,3,1,
//         1,0,1,1,1,1,0,1,1,1,1,0,1,4,4,1,1,1,1,0,1,0,1,1,1,0,1,1,
//         1,3,1,4,4,1,0,0,0,0,0,0,1,4,4,4,4,4,1,0,0,0,1,4,1,0,1,4,
//         1,0,1,4,4,1,0,1,1,0,1,0,1,4,4,4,4,4,1,0,1,0,1,4,1,0,1,4,
//         1,0,1,1,1,1,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1,1,
//         1,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,
//         1,0,1,1,1,1,0,3,1,0,1,1,1,0,1,0,1,1,1,0,1,0,1,1,1,1,0,1,
//         1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1,
//         1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,
//         4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,1,4,4,4,4,4,
//         4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
//         1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
//         4,0,0,0,0,0,0,1,4,1,0,2,2,2,2,2,2,0,1,4,1,0,0,0,0,0,0,4,
//         1,1,1,1,1,1,0,1,1,1,0,1,2,2,2,2,1,0,1,1,1,0,1,1,1,1,1,1,
//         4,4,4,4,4,1,0,0,0,0,0,1,1,4,4,1,1,0,0,0,0,0,1,4,4,4,4,4,
//         4,4,4,4,4,1,0,1,1,1,0,0,0,0,0,0,0,0,1,0,1,0,1,4,4,4,4,4,
//         1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,1,3,1,0,1,1,1,1,1,1,
//         1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,3,1,
//         1,0,1,1,1,1,0,3,1,0,0,1,1,1,1,1,1,0,0,0,0,0,1,0,1,1,1,1,
//         1,0,0,0,0,0,0,0,0,0,1,1,4,4,4,4,1,1,0,1,1,0,1,0,1,4,4,4,
//         1,1,1,0,1,1,1,1,1,0,1,4,4,4,4,4,4,1,0,0,0,0,1,0,1,4,4,4,
//         4,4,1,0,1,4,4,4,1,0,1,4,4,4,4,4,4,1,0,1,1,1,1,0,1,1,1,1,
//         1,1,1,0,1,1,1,1,1,0,1,1,1,4,4,1,1,1,0,0,0,0,0,0,0,0,0,1,
//         1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,1,1,1,0,1,1,0,1,
//         1,3,1,1,1,1,1,1,1,1,1,0,1,4,4,1,0,1,0,1,4,4,1,0,1,3,0,1,
//         1,0,0,0,0,0,0,0,0,0,0,0,1,4,4,1,0,0,0,1,4,4,1,0,0,0,0,1,
//         1,1,1,1,1,1,1,1,1,1,1,1,1,4,4,1,1,1,1,1,4,4,1,1,1,1,1,1]; 
//     // 0 = pac-dot ; 1 = wall ; 2 = ghost-lair ; 3 = power-pellet ; 4 = empty;
//     const squares = [];

//     // Draw the grid
//     function createBoard() {
//         for (let i = 0; i < layout.length ; i++){
//             const square = document.createElement("div");
//             grid.appendChild(square);
//             squares.push(square);

//             // Add layout to the board
//             if (layout[i] === 0) {
//                 squares[i].classList.add("pac-dot");
//             } else if (layout[i] === 1) {
//                 squares[i].classList.add("wall");
//             } else if (layout[i] === 2) {
//                 squares[i].classList.add("ghost-lair");
//             } else if (layout[i] === 3) {
//                 squares[i].classList.add("power-pellet");
//             } else if (layout[i] === 4) {
//                 squares[i].classList.add("empty");
//             }
//         }
//     }
//     createBoard();

//     //User's best score
//     function bestScoreCount () {
//         let higher;
//         let bestScore = window.localStorage.getItem(higher);
//         window.localStorage.setItem(bestScore, higher);
//         const bestScoreDisplay = document.getElementById("bestScore");
//         if (bestScore == null) {
//             bestScore = score;
//             window.localStorage.setItem(higher, bestScore);
//         } else if (score < Number(window.localStorage.getItem(higher))) {
//             bestScore = score;    
//         } else if (score > Number(window.localStorage.getItem(higher))) {
//             window.localStorage.clear();
//             bestScore = score;
//             window.localStorage.setItem(higher, bestScore);
//         }
//         bestScoreDisplay.innerHTML = window.localStorage.getItem(higher);
//     }
//     bestScoreCount();

//     // Starting position of Pac-Man
//     let pacmanCurrentIndex = 518;
//     squares[pacmanCurrentIndex].classList.add("pac-man");

//     // Move Pac-Man
//     function movePacman(e) {
//         if (!gameRunning) return; // Do not move Pac-Man if the game is paused
    
//         const directions = {
//             37: { delta: -1, transform: "scaleX(-1) rotate(95deg)", wrap: 363, wrapTo: 391 }, // Left
//             38: { delta: -width, transform: "scaleY(1)" }, // Up
//             39: { delta: +1, transform: "scaleY(1) rotate(95deg)", wrap: 392, wrapTo: 364 }, // Right
//             40: { delta: +width, transform: "rotate(190deg)" } // Down
//         };
    
//         const direction = directions[e.keyCode];
//         if (!direction) return; // Invalid key pressed
    
//         const nextIndex = pacmanCurrentIndex + direction.delta;
    
//         // Check boundaries and obstacles
//         if (
//             (nextIndex >= 0 && nextIndex < squares.length) && // Within grid bounds
//             !squares[nextIndex].classList.contains("wall") &&
//             !squares[nextIndex].classList.contains("ghost-lair")
//         ) {
//             // Handle edge wrapping
//             let newPacmanIndex = nextIndex;
//             if (pacmanCurrentIndex === 363 && direction.wrap === 363) {
//                 newPacmanIndex = 391;
//             } else if (pacmanCurrentIndex === 391 && direction.wrapTo === 363) {
//                 newPacmanIndex = 363;
//             } else if (pacmanCurrentIndex === 392 && direction.wrap === 392) {
//                 newPacmanIndex = 364;
//             } else if (pacmanCurrentIndex === 364 && direction.wrapTo === 392) {
//                 newPacmanIndex = 392;
//             }
    
//             // Remove Pac-Man from the current position
//             squares[pacmanCurrentIndex].classList.remove("pac-man");
    
//             // Update Pac-Man's position
//             pacmanCurrentIndex = newPacmanIndex;
//             squares[pacmanCurrentIndex].classList.add("pac-man");
//             squares[pacmanCurrentIndex].style.transform = direction.transform;
    
//             // Perform game logic
//             pacDotEaten();
//             powerPelletEaten();
//             checkForGameOver();
//             checkForWin();
//         }
//     }
//     let desiredDirection = null; // Store the desired direction
// let lastMoveTime = 0; // Track the last time Pac-Man moved
// const PACMAN_SPEED = 150; // Time in milliseconds between movements (reduce this value to increase speed)

// function updatePacman(deltaTime) {
//     if (!desiredDirection) return; // No movement if no desired direction

//     const currentTime = Date.now(); // Get current timestamp
//     if (currentTime - lastMoveTime < PACMAN_SPEED) {
//         return; // Wait until enough time has passed since the last move
//     }

//     lastMoveTime = currentTime; // Update the last move time

//     const nextIndex = pacmanCurrentIndex + desiredDirection.delta;

//     // Check boundaries and obstacles
//     if (
//         (nextIndex >= 0 && nextIndex < squares.length) && // Within grid bounds
//         !squares[nextIndex].classList.contains("wall") &&
//         !squares[nextIndex].classList.contains("ghost-lair")
//     ) {
//         // Handle edge wrapping
//         let newPacmanIndex = nextIndex;
//         if (pacmanCurrentIndex === 363 && desiredDirection.wrap === 363) {
//             newPacmanIndex = 391;
//         } else if (pacmanCurrentIndex === 391 && desiredDirection.wrapTo === 363) {
//             newPacmanIndex = 363;
//         } else if (pacmanCurrentIndex === 392 && desiredDirection.wrap === 392) {
//             newPacmanIndex = 364;
//         } else if (pacmanCurrentIndex === 364 && desiredDirection.wrapTo === 392) {
//             newPacmanIndex = 392;
//         }

//         // Remove Pac-Man from the current position
//         squares[pacmanCurrentIndex].classList.remove("pac-man");

//         // Update Pac-Man's position
//         pacmanCurrentIndex = newPacmanIndex;
//         squares[pacmanCurrentIndex].classList.add("pac-man");
//         squares[pacmanCurrentIndex].style.transform = desiredDirection.transform;

//         // Perform game logic
//         pacDotEaten();
//         powerPelletEaten();
//         checkForGameOver();
//         checkForWin();
//     }
// }
//     document.addEventListener("keydown", (e) => {
//         if (!gameRunning) return; // Do not process input if the game is paused

//         const directions = {
//             37: { delta: -1, transform: "scaleX(-1) rotate(95deg)", wrap: 363, wrapTo: 391 }, // Left
//             38: { delta: -width, transform: "scaleY(1)" }, // Up
//             39: { delta: +1, transform: "scaleY(1) rotate(95deg)", wrap: 392, wrapTo: 364 }, // Right
//             40: { delta: +width, transform: "rotate(190deg)" } // Down
//         };

//         const direction = directions[e.keyCode];
//         if (direction) {
//             desiredDirection = direction; // Set the desired direction
//         }
//     });
    
//     document.addEventListener("keyup", () => {
//         desiredDirection = null; // Clear the desired direction when the key is released
//     });

    
//     // When Pac-Man eats a Pac-Dot
//     function pacDotEaten() {
//         if (squares[pacmanCurrentIndex].classList.contains("pac-dot")){
//             score++;
//             toWin++;
//             squares[pacmanCurrentIndex].classList.remove("pac-dot");
//         }
//         scoreDisplay.innerHTML = score;
//     }

//     // When Pac-Man eats a Power-Pellet
//     function powerPelletEaten () {
//         if (squares[pacmanCurrentIndex].classList.contains("power-pellet")) {
//             score += 10;
//             toWin += 10;
//             ghosts.forEach(ghost => ghost.isScared = true);
//             setTimeout(unScareGhosts, 7000);
//             squares[pacmanCurrentIndex].classList.remove("power-pellet");
//         }
//         scoreDisplay.innerHTML = score;
//     }

//     // Create Ghost template
//     class Ghost {
//         constructor(className, startIndex, speed) {
//             this.className = className;
//             this.startIndex = startIndex;
//             this.speed = speed;
//             this.currentIndex = startIndex;
//             this.isScared = false;
//             this.lastUpdate = 0;
//             this.animationId = null;
//         }
    
//         stopMovement() {
//             if (this.animationId) {
//                 cancelAnimationFrame(this.animationId);
//                 this.animationId = null;
//             }
//         }
//     }
    

//     const ghosts = [
//         new Ghost("blinky", 348, 290),  // Scaled down from 290
//         new Ghost("pinky", 376, 380),   // Scaled down from 380
//         new Ghost("inky", 351, 200),    // Scaled down from 200
//         new Ghost("clyde", 379, 250)    // Scaled down from 250
//     ];
        
//     // Give back their colors to the ghosts
//     function unScareGhosts () {ghosts.forEach(ghost => ghost.isScared = false)}
    
//     // Draw the ghosts onto the grid
//     ghosts.forEach(ghost => {
//         squares[ghost.currentIndex].classList.add(ghost.className);
//         squares[ghost.currentIndex].classList.add("ghost");
//     })

    

//     function moveGhost(ghost) {
//         const directions = [-1, +1, width, -width];
//         let direction = directions[Math.floor(Math.random() * directions.length)];
        
//         function updateGhost(timestamp) {
//             if (!gameRunning) {
//                 ghost.animationId = requestAnimationFrame(updateGhost);
//                 return;
//             }
    
//             // Calculate time elapsed since last update
//             if (!ghost.lastUpdate) ghost.lastUpdate = timestamp;
//             const deltaTime = timestamp - ghost.lastUpdate;
    
//             // Only update ghost position if enough time has passed (based on ghost speed)
//             if (deltaTime >= ghost.speed) {
//                 // Reset lastUpdate time but maintain remainder for smoother movement
//                 ghost.lastUpdate = timestamp - (deltaTime % ghost.speed);
    
//                 // Move ghost logic
//                 if (!squares[ghost.currentIndex + direction].classList.contains("ghost") && 
//                     !squares[ghost.currentIndex + direction].classList.contains("wall")) {
//                     squares[ghost.currentIndex].classList.remove(ghost.className);
//                     squares[ghost.currentIndex].classList.remove("ghost", "scared-ghost");
//                     ghost.currentIndex += direction;
//                     squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
//                 } else if (ghost.currentIndex - 1 === 363) {
//                     squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
//                     ghost.currentIndex = 391;
//                     squares[ghost.currentIndex].classList.add("ghost");
//                 } else if (ghost.currentIndex + 1 === 392) {
//                     squares[ghost.currentIndex].classList.remove(ghost.className, "ghost");
//                     ghost.currentIndex = 364;
//                     squares[ghost.currentIndex].classList.add("ghost");
//                 } else {
//                     direction = directions[Math.floor(Math.random() * directions.length)];
//                 }
    
//                 if (ghost.isScared) {
//                     squares[ghost.currentIndex].classList.add("scared-ghost");
//                 }
    
//                 if (squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
//                     squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
//                     ghost.currentIndex = ghost.startIndex;
//                     score += 100;
//                     scoreDisplay.innerHTML = score;
//                     squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
//                 }
    
//                 checkForGameOver();
//             }
    
//             // Continue the animation loop
//             ghost.animationId = requestAnimationFrame(updateGhost);
//         }
    
//         // Start the animation loop
//         ghost.animationId = requestAnimationFrame(updateGhost);
//     }
//     // Check for Game Over
//     function checkForGameOver() {
//         if (squares[pacmanCurrentIndex].classList.contains("ghost") && 
//             !squares[pacmanCurrentIndex].classList.contains("scared-ghost")) {
//             lives--;
//             livesDisplay.innerHTML = lives;
//             gameRunning = false;
            
//             if (lives === 0) {
//                 // Stop all ghost animations
//                 ghosts.forEach(ghost => ghost.stopMovement());
//                 document.removeEventListener("keydown", movePacman);
//                 bestScoreCount();
//                 scoreDisplay.innerHTML = score;
//                 let gameOver = document.createElement("div");
//                 gameOver.classList.add("gameOver");
//                 document.body.append(gameOver);
//                 restartButton.classList.add("restart");
//                 document.body.append(restartButton);
//                 document.getElementById("play").removeEventListener("click", game);
//                 restartButton.addEventListener("click", () => {window.location.reload(false)});
//             } else {
//                 // Reset Pac-Man and ghosts positions
//                 gameRunning = true;
//                 squares[pacmanCurrentIndex].classList.remove("pac-man");
//                 pacmanCurrentIndex = 518;
//                 squares[pacmanCurrentIndex].classList.add("pac-man");
                
//                 ghosts.forEach(ghost => {
//                     squares[ghost.currentIndex].classList.remove(ghost.className, "ghost", "scared-ghost");
//                     ghost.currentIndex = ghost.startIndex;
//                     squares[ghost.currentIndex].classList.add(ghost.className, "ghost");
//                 });
//             }
//         }
//     }

//     // Check for Win
//     function checkForWin () {
//         if (toWin === 372) {
//             ghosts.forEach(ghost => clearInterval(ghost.timerId));
//             document.removeEventListener("keydown", movePacman);
//             bestScoreCount();
//             scoreDisplay.innerHTML = score;
//             let youWon = document.createElement("div");
//             youWon.classList.add("won");
//             document.body.append(youWon);
//             restartButton.classList.add("restart");
//             document.body.append(restartButton);
//             document.getElementById("play").removeEventListener("click", game);
//             restartButton.addEventListener("click", () => {window.location.reload(false)})
//         }
//     }

//     // Pause Menu
//     function createPauseMenu() {
//         const pauseMenu = document.createElement("div");
//         pauseMenu.classList.add("pause-menu");

//         const continueButton = document.createElement("button");
//         continueButton.innerText = "Continue";
//         continueButton.addEventListener("click", () => {
//             gameRunning = true;
//             startTime += (Date.now() - pauseTime); // Adjust the start time to account for the pause
//             pauseMenu.remove();
//         });

//         const restartButton = document.createElement("button");
//         restartButton.innerText = "Restart";
//         restartButton.addEventListener("click", () => {
//             window.location.reload(false);
//         });

//         pauseMenu.appendChild(continueButton);
//         pauseMenu.appendChild(restartButton);
//         document.body.appendChild(pauseMenu);
//     }

//     // Pause the game
//     document.addEventListener("keydown", (e) => {
//         if (e.keyCode === 27) { // ESC key
//             if (gameRunning) {
//                 gameRunning = false;
//                 pauseTime = Date.now();
//                 createPauseMenu();
//             } else {
//                 gameRunning = true;
//                 startTime += (Date.now() - pauseTime); // Adjust start time
//                 document.querySelector(".pause-menu").remove();
//             }
//         }
//     });

//     // Update the time display
//     function updateTime() {
//         if (gameRunning) {
//             const currentTime = Math.floor((Date.now() - startTime) / 1000);
//             timeDisplay.innerHTML = `Time: ${currentTime}s`;
//         }
//         requestAnimationFrame(updateTime);
//     }
//     const FIXED_TIME_STEP = 16.67; // Target 60 FPS
//     let accumulator = 0;
//     let lastFrameTime = 0;
//     function gameLoop(currentTime) {
//         if (!gameRunning) return;

//         const deltaTime = Math.min(currentTime - lastFrameTime, 100); // Cap deltaTime
//         lastFrameTime = currentTime;
       
//         // Update Pac-Man
//        updatePacman(deltaTime);

//         // Update ghosts
//         requestAnimationFrame(gameLoop);
//     }
//     // Initialize the game loop
//     requestAnimationFrame(gameLoop);
    
//      // Attach the updateGhost function to each ghost
//      ghosts.forEach(ghost => {
//         squares[ghost.currentIndex].classList.add(ghost.className);
//         squares[ghost.currentIndex].classList.add("ghost");
//         moveGhost(ghost);
//     });
   
// });