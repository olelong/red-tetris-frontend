import { configureStore, createSlice } from "@reduxjs/toolkit";
import { socket } from "../socket";

// const initialState = {
//   room: undefined,
//   username: undefined,
//   move: "left" | "right" | "rotation" | "soft drop" | "hard drop",
//   masterName: null,
//   players: [],
//   board: [],
//   spectrums: [{ username: null, spectrum: [] }],
//   winnerName: null,
// };

//CreateGame/Room, JoinRoom, launchGame, movePiece
// GameSlice et un RoomSlice

const roomSlice = createSlice({
  name: "room",
  initialState: {
    // Send to the server:

    // Receive from server:
    players: [""],
    master: "",
  },
  reducers: {
    updateMaster: (state, action) => {
      console.log("mater reducer");
      state.master = action.payload?.master;
    },
    updatePlayers: (state, action) => {
      console.log("players reducer");
      state.players = action.payload?.players;
    },
  },
});

const gameSlice = createSlice({
  name: "game",
  initialState: {
    // Send to the server:
    // Receive from server:
    board: [],
    gameOver: false,
    spectrums: [{ username: "", spectrum: [] }],
    winner: undefined,
  },
  reducers: {
    updateBoard: (state, action) => {
      console.log("board reducer");
      state.board = action.payload?.board;
    },
    updateGameOver: (state, action) => {
      console.log("gameOver reducer");
      state.gameOver = action.payload?.gameOver;
    },
    updateSpectrums: (state, action) => {
      state.spectrums = action.payload?.spectrums;
    },
    updateWinner: (state, action) => {
      state.winner = action.payload?.winner;
    },
  },
});

// export const { updateBoard, updateGameOver, updateSpectrums, updateWinner } =
//   gameSlice.actions;
// next(setGameOver());

function connect() {
  console.log("Connected to the socket");
}

function onUpdateGame(board, gameOver) {
  store.dispatch(gameSlice.actions.updateBoard(board));
  store.dispatch(gameSlice.actions.updateGameOver(gameOver));
  console.log("Updating the game yeah", board, gameOver);
}

function onSpectrums(spectrums) {
  store.dispatch(gameSlice.actions.updateSpectrums(spectrums));
  console.log("update Spectrums", spectrums);
}

function onEndGame(winner) {
  store.dispatch(gameSlice.actions.updateWinner(winner));
  console.log("winner is:", winner);
}

function onMaster(username) {
  store.dispatch(roomSlice.actions.updateMaster(username));
  console.log("Master is: ", username);
}

function onPlayers(players) {
  store.dispatch(roomSlice.actions.updatePlayers(players));
  console.log("Players are: ", players);
}

export const socketMiddleware = (socket) => {
  let isListeningToEvents = false;
  // socket.off
  socket.off("connect", connect);
  socket.off("game:update", onUpdateGame);
  socket.off("game:spectrums", onSpectrums);
  socket.off("game:end", onEndGame);
  socket.off("room:master", onMaster);
  socket.off("room:players", onPlayers);

  return (store) => (next) => (action) => {
    // HERE RECEIVE FROM SERVER
    if (!isListeningToEvents) {
      socket.on("connect", connect);
      socket.on("game:update", onUpdateGame);
      socket.on("game:spectrums", onSpectrums);
      socket.on("game:end", onEndGame);
      socket.on("room:master", onMaster);
      socket.on("room:players", onPlayers);

      isListeningToEvents = true;
    }
    // BELOW SEND TO SERVER
    switch (action.type) {
      case "room:create":
        if (socket.connected) {
          socket.emit("room:create", action.payload, (response) => {
            console.log("Res: ", response, action.payload);
          });
        }
        break;
      default:
        next(action);
    }
  };
};

const store = configureStore({
  reducer: { game: gameSlice.reducer, room: roomSlice },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export default store;
// Explications de WAEL:
// function socketMiddleware(socket) {
//   return function firstFn(next) {
//     return function secondFn(action) {
//     }
//   }
// }
