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

const gameSlice = createSlice({
  name: "game",
  initialState: {
    board: [],
    gameOver: false,
    spectrums: [{ username: "", spectrum: [] }],
    winner: undefined,
  },
  reducers: {
    updateBoard: (state, action) => {
      console.log("board reducer");
      state.board = action.payload;
    },
    updateGameOver: (state, action) => {
      console.log("gameOver reducer");
      state.gameOver = action.payload;
    },
    updateSpectrums: (state, action) => {
      state.spectrums = action.payload;
    },
    updateWinner: (state, action) => {
      state.winner = action.payload;
    }
  },
});

export const { setGameOver } = gameSlice.actions;
// next(setGameOver());

export const socketMiddleware = (socket) => {
  let isListeningToEvents = false;

  return (store) => (next) => (action) => {
    console.log(store);
    // HERE RECEIVE FROM SERVER
    if (!isListeningToEvents) {
      console.log(socket.connected);
      socket.on("connect", () => {
        console.log("Connected to the socket");
      });
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
  reducer: { game: gameSlice.reducer },
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
