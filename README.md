# Tetris Multiplayer Frontend
A project with [**Whazami**]([https://github.com/whazami])

This repository contains the **frontend** of the Tetris Multiplayer project. The application allows users to play Tetris solo or with friends in multiplayer mode. Themes change randomly to enhance the gaming experience.

---

## Features
- **Single Player Mode**: Accessible directly via the browser.
- **Multiplayer Mode**: Create and join rooms with custom unique usernames.
- **Dynamic Themes**: The Tetris game changes its appearance randomly.
- **Real-Time Communication**: Powered by sockets for seamless interactions.
- **Bonus for Tetris Players**: Includes support for all advanced moves, including T-Spins, O-Spins, and other spin techniques, adding depth and strategy to the gameplay.
- **Special Spin Penalties**: When a player performs a spin in multiplayer mode, a special penalty is applied to other players, temporarily increasing the gravity and making their pieces fall faster.
- **Line Clear Penalties**: In multiplayer mode, clearing more than one line at a time sends penalties to other players. The number of lines sent is equal to the number cleared minus one, and these penalty lines are indestructible.
- **Spectator View**: Players can view the "ghost pieces" or specters of other players' boards in multiplayer mode.

---

## Prerequisites
To run this frontend, you also need the [**backend repository**]([https://github.com/olelong/red-tetris-backend]). Make sure to clone and set it up before proceeding.

---

## Setup Instructions

### Step 1: Clone and Set Up the Backend
1. Clone the backend repository:
   ```bash
   git clone git@github.com:olelong/red-tetris-backend.git
   cd red-tetris-backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the backend server:
   ```bash
   npm run start
   ```

### Step 2: Clone and Set Up the Frontend
1. Clone this repository:
    ```bash
   git clone git@github.com:olelong/red-tetris-frontend.git
   cd red-tetris-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend server:
   ```bash
   npm run start
   ```

The frontend will be accessible at:
- **http://localhost:3001** (when run standalone)
- **http://localhost:3000** (if served statically by the backend).

---

## How to Play

### Single Player Mode
- Open the following URL:
  ```
  http://localhost:3000
  ```
  Or:
  ```
  http://localhost:3001
  ```

### Multiplayer Mode
- Use the following format to join a room:
  ```
  http://localhost:3000/{roomName}/{userName}
  ```
  Replace `{roomName}` with the name of the room and `{userName}` with your desired username.

---

## Available Commands

### Development Commands
- **Install dependencies**:
  ```bash
  npm install
  ```
- **Start the development server**:
  ```bash
  npm run start
  ```

### Build Commands
- **Build for production**:
  ```bash
  npm run build
  ```

### Testing Commands
- **Run tests**:
  ```bash
  npm run test
  ```
- **View test coverage**:
  ```bash
  npm run coverage
  ```

---

## Technologies Used
- **Frontend**: ReactJS, Redux
- **Backend Communication**: Sockets (no database or API involved).

---

Enjoy the game!

