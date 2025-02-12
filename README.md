# make-your-game: Pac-Man

## Overview
This project is a modern re-creation of the classic Pac-Man arcade game using vanilla JavaScript. It features smooth animations, a responsive design, and a fully functional AI for the four ghosts, each with distinct behaviors.

## Features
### Gameplay
- Classic Pac-Man mechanics
- Four unique ghosts with distinct movement patterns
- Power pellets that temporarily weaken ghosts
- Score tracking and local storage for high scores
- Pause/Resume functionality
- Lives system with game-over conditions
- Timer tracking for gameplay statistics

### Technical
- Frame-independent movement using `requestAnimationFrame`
- Grid-based collision detection system
- Optimized character movement for smooth transitions
- AI-driven ghost pathfinding with strategic behaviors
- Mobile-friendly controls, including touch gestures
- Performance optimizations using CSS transforms

## Controls
### Desktop
- **Arrow Keys**: Move Pac-Man
- **ESC**: Pause/Resume the game
- **Enter**: Start/Restart the game


## Technical Implementation
### Core Components
1. **Game Engine**
   - Central game loop using `requestAnimationFrame`
   - State management for different game phases
   - Collision detection between Pac-Man, ghosts, and objects
   - Score and lives tracking
   - Event handling for user inputs
   - Timed transitions for ghost behavior changes
   - Power pellet mechanics for temporary ghost vulnerability

2. **Movement System**
   - Frame-independent movement using delta time
   - Smooth interpolation between grid positions

3. **Ghost AI**
   - Unique movement strategies:
     - **Blinky**: Direct pursuit using shortest path
     - **Pinky**, **Inky** &  **Clyde**: Mixed random and pursuit behavior
   - State-based AI transitions (Chase, Scatter, Frightened)
   - Intelligent pathfinding algorithms
   - Mode switching for more dynamic gameplay


## Visual & UI Features
- Classic Pac-Man character design
- Scared ghost state with visual indication
- Fully responsive layout for different screen sizes

## Performance Optimizations
- Efficient rendering using CSS transforms
- Throttled pathfinding calculations for AI
- Optimized collision detection
- Frame-independent movement for smooth experience

## Future Enhancements
- Additional ghost AI patterns for increased difficulty
- Sound effects and background music
- Multiple levels with increasing challenges
- New power-ups for varied gameplay
- Online leaderboard system
- Ghost AI for all the ghosts

## Game States
- **Ready**: Initial game setup
- **Playing**: Active gameplay
- **Paused**: Game paused with menu overlay
- **Power Pellet Mode**: Temporary ghost vulnerability
- **Death**: Pac-Man loses a life with an animation sequence
- **Game Over**: Final score display with restart option
- **Win**: Level completion with celebration animation

## Scoring System
- **Pac-Dots**: 10 points
- **Power Pellets**: 50 points
- **Ghost Capture (while frightened)**: 200 points
- **High Score Tracking**: Saved using `localStorage`

## Getting Started
1. Clone the repository:
   ```bash
   git clone https://github.com/bernotieno/pac-man.git
   ```
2. Navigate to the project directory:
   ```bash
   cd pac-man
   ```
3. Open `index.html` in a modern web browser.
4. Press **Enter** or click "Play" to start.
5. Use **arrow keys** (desktop) or **swipe gestures** (mobile) to move Pac-Man.
6. Collect all dots while avoiding ghosts to win.

Alternatively, download the [ZIP file](https://github.com/bernotieno/pac-man/archive/refs/heads/main.zip) from GitHub.

## Development Guidelines
- All game logic is modular and located in the `scripts` directory.
- CSS styles can be modified in the `styles` directory.
- Ghost behaviors can be customized in individual ghost class files.
- Board layouts and game settings can be modified in `utils.js`.

## License
This project is open-source and licensed under the **MIT License**.

