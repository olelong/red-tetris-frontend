<h1>
  <img src="public/favicon.ico" width="50px" /> Tetris Multiplayer Frontend
</h1>

A project with [Whazami](https://github.com/whazami)

This repository contains the **frontend** of the Tetris Multiplayer project. The application allows users to play Tetris solo or with friends in multiplayer mode. Themes change randomly to enhance the gaming experience.

---
<h2>
   <img src="src/assets/catsTheme/blue-cat.png" width="30px" />
  Features
</h2>

- **Single Player Mode**: Accessible directly via the browser.
- **Multiplayer Mode**: Create and join rooms with custom unique usernames.
<div align="center">
 <img src="screenshots/fruitTheme.png" width="500px" />
</div>
  
- **Spectator View**: Players can view the "ghost pieces" or specters of other players' boards in multiplayer mode.
- **Line Clear Penalties**: In multiplayer mode, clearing more than one line at a time sends penalties to other players. The number of lines sent is equal to the number cleared minus one, and these penalty lines are indestructible.
<div align="center">
 <img src="screenshots/CatThemeWithPenalty.png" width="500px" />
</div>

- **Room Master System**: The first player to connect to a room becomes the master and is the only one who can start the game. If the master leaves the room, another player is automatically assigned as the new master.
- **Joining Ongoing Games**: If a player joins a game already in progress, they will need to refresh the page after the game ends to rejoin the room.
- **Dynamic Themes**: The Tetris game changes its appearance randomly.
- **Real-Time Communication**: Powered by sockets for seamless interactions.
- **Bonus for Tetris Players**: Includes support for all advanced moves, including T-Spins, O-Spins, and other spin techniques, adding depth and strategy to the gameplay.

<div align="center">
  <video src="https://github.com/user-attachments/assets/59d0837b-480f-42d5-874b-bac95c14e7ed" >
    Your browser does not support videos but you can watch the T-Spin demo <a href="https://github.com/user-attachments/assets/59d0837b-480f-42d5-874b-bac95c14e7ed" >here</a>.
  </video>
</div>

- **Special Spin Penalties**: When a player performs a spin in multiplayer mode, a special penalty is applied to other players, temporarily increasing the gravity and making their pieces fall faster.

---
<h2>
   <img src="src/assets/fairiesTheme/fairyRed.png" width="30px" />
  Prerequisites
</h2>

To run this frontend, you also need the [backend repository](https://github.com/olelong/red-tetris-backend). Make sure to clone and set it up before proceeding.

---
<h2>
   <img src="src/assets/fruitsTheme/orange.png" width="30px" /> 
  Setup Instructions
</h2>

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
   Y // Would you like to run the app on another port instead? › (Y/n)
   ```

The frontend will be accessible at:
- **http://localhost:3001** (when run standalone)
- **http://localhost:3000** (if served statically by the backend).

---
<h2>
   <img src="src/assets/catsTheme/purple-cat.png" width="30px" />
  How to Play
</h2>

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
  <div align="center">
  <img src="screenshots/url.png" width="500px" />
  </div>

---
<h2>
   <img src="src/assets/fairiesTheme/fairyCyan.png" width="30px" />
 Available Commands
</h2>

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
<div align="center">
  <img src="screenshots/testFrontend.png" width="300px" />
  <img src="screenshots/backendTest.png" width="300px" />
</div>
  
- **View test coverage**:
  ```bash
  npm run coverage
  ```
<div align="center">
  <video src="
https://github.com/user-attachments/assets/4350f5ce-7ecf-4d78-91ce-53e50f484b73
" >
    Your browser does not support videos but you can watch the coverage demo <a href="
https://github.com/user-attachments/assets/4350f5ce-7ecf-4d78-91ce-53e50f484b73
" >here</a>.
  </video>
  <img src="screenshots/coverageBackend.png" width="90%"/>
</div>
  

https://github.com/user-attachments/assets/4350f5ce-7ecf-4d78-91ce-53e50f484b73


---
<h2>
  <img src="src/assets/fruitsTheme/myrtille.png" width="30px" />
  Technologies Used
</h2>

## Technologies Used
- **Frontend**:
<div align="left">
  <img src="screenshots/react.png" width="200px" />
  <img src="screenshots/redux.png" width="200px" />
</div>
  
- **Backend**: (no database or API involved)
<div align="left">
  <img src="screenshots/socketio.png" width="200px" />
  <img src="screenshots/nest.png" width="200px" />
</div>
---
<h2>
  <img src="src/assets/catsTheme/penalty-cat.png" width="30px" />
  License
</h2>
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Enjoy the game!
