# Make-My-Game: Pac-Man

A modern implementation of the classic Pac-Man arcade game built with vanilla JavaScript, featuring smooth animations and responsive design.

## 🎮 Demo Features

- Classic Pac-Man gameplay mechanics
- Four unique ghosts with distinct behaviors
- Power pellets and ghost vulnerability system
- Responsive design for both desktop and mobile
- Score tracking with local storage for high scores
- Pause/Resume functionality
- Lives system
- Timer tracking

## 🚀 Technical Features

- Frame-independent movement using requestAnimationFrame
- Grid-based collision system
- Smooth character transitions
- Ghost AI pathfinding (especially for Blinky)
- Mobile-friendly touch controls
- Optimized performance with CSS transforms

## 🎯 Game Controls

### Desktop
- Arrow keys (←↑→↓) for Pac-Man movement
- `ESC` - Pause/Resume game
- `Enter` - Start/Restart game

### Mobile
- Swipe gestures for movement

## 🛠 Technical Implementation

### Core Components

1. **Game Engine**
- Central game loop with requestAnimationFrame
- State management system
- Collision detection system
- Score and lives tracking
- Event handling for keyboard and touch inputs
- Timing system for ghost behavior changes
- Power pellet duration management

2. **Movement System**
- Frame-independent movement
- Delta time-based updates
- Smooth interpolation between grid positions

3. **Ghost AI**
- Unique behavior patterns for each ghost:
  - Blinky: Direct chase using shortest path
  - Pinky: Ambush by targeting ahead of Pac-Man
  - Inky: Complex targeting using Blinky's position
  - Clyde: Random movement when far, chase when close
- State machine for ghost behavior modes
- Pathfinding algorithm for intelligent movement
- Scatter and Chase mode alternation
- Frightened mode behavior when power pellets are active

## 🏗 Project Structure

```
make-my-game/
├── index.html
├── styles/
│   ├── styles.css
│   └── pacman.css
└── scripts/
    ├── game.js
    ├── pacman.js
    ├── ghost-base.js
    ├── blinky.js
    ├── pinky.js
    ├── inky.js
    ├── clyde.js
    ├── board.js
    ├── ui.js
    └── utils.js
```

## 🎨 Visual Features

- Classic Pac-Man character design
- Ghost animations with scared state
- Responsive grid layout
- Mobile-optimized interface
- Smooth rotation animations for Pac-Man

## 💻 Technical Requirements

- Modern web browser with JavaScript enabled
- Support for CSS transforms and transitions
- Touch support for mobile devices

## 🔧 Performance Optimizations

- CSS transform-based animations
- Throttled pathfinding calculations
- Efficient collision detection
- Optimized ghost movement algorithms
- Frame-independent movement system

## 🎯 Future Improvements

- Additional ghost AI patterns
- Sound effects and background music
- Multiple levels with increasing difficulty
- Additional power-ups
- Online leaderboard system

## 📱 Mobile Support

The game is fully responsive and supports:
- Touch controls
- Adaptive grid sizing
- Mobile-optimized UI elements
- Gesture-based controls

## 🔄 Game States

- Ready State: Initial game setup and countdown
- Playing State: Active gameplay with all mechanics
- Paused State: Game frozen with overlay menu
- Power Pellet State: Special ghost behavior mode
- Death State: Pac-Man death animation sequence
- Game Over State: Final score display and restart option
- Win State: Level completion celebration

## 🏆 Scoring System

- Pac-Dots: 10 points
- Power Pellets: 50 points
- Ghost catches (while scared): 200 points
- High score tracking via localStorage

## 🎮 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/bernotieno/pac-man.git
```

2. Navigate to the project directory:
```bash
cd pac-man
```

3. Open `index.html` in a modern web browser
4. Click "Play" or press Enter to start
5. Use arrow keys (desktop) or swipe (mobile) to control Pac-Man
6. Collect all dots while avoiding ghosts to win

You can also [download the ZIP file](https://github.com/bernotieno/pac-man/archive/refs/heads/main.zip) directly from GitHub.

## 🔧 Development

To modify or enhance the game:
1. All game logic is modular and contained in the `scripts` directory
2. Styles can be modified in the `styles` directory
3. Ghost behaviors can be customized in individual ghost class files
4. Board layout can be modified in the `utils.js` configuration

## 📄 License

This project is open source and available under the MIT License.
