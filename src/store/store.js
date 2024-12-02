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
    isRoomCreated: undefined,

    // Receive from server:
    players: [""],
    master: "",
  },
  reducers: {
    // Send to the server:
    createRoom: (state, action) => {
      state.isRoomCreated = action.payload;
      console.log(
        "create a room or a game: ",
        state.isRoomCreated,
        action.payload
      );
    },
    // Receive from server:
    updateMaster: (state, action) => {
      state.master = action.payload;
      // console.log("master reducer", state.master, action.payload);
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
      // console.log("players reducer", state.players, action.payload);
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
    // Receive from server:
    updateBoard: (state, action) => {
      state.board = action.payload;
      // console.log("board reducer", state.board, action.payload);
    },
    updateGameOver: (state, action) => {
      state.gameOver = action.payload;
      // console.log("gameOver reducer", state.gameOver, action.payload);
    },
    updateSpectrums: (state, action) => {
      state.spectrums = action.payload;
      // console.log("update spectrums reducer", state.spectrums, action.payload);
    },
    updateWinner: (state, action) => {
      state.winner = action.payload;
      // console.log("update winner reducer", state.winner, action.payload);
    },
  },
});

// export const { updateBoard, updateGameOver, updateSpectrums, updateWinner } =
//   gameSlice.actions;
// next(setGameOver());

function connect() {
  // console.log("Connected to the socket");
}

function onUpdateGame({ board, gameOver }) {
  store.dispatch(gameSlice.actions.updateBoard(board));
  store.dispatch(gameSlice.actions.updateGameOver(gameOver));
}

function onSpectrums({ spectrums }) {
  store.dispatch(gameSlice.actions.updateSpectrums(spectrums));
}

function onEndGame({ winner }) {
  store.dispatch(gameSlice.actions.updateWinner(winner));
}

function onMaster({ username }) {
  store.dispatch(roomSlice.actions.updateMaster(username));
}

function onPlayers({ players }) {
  store.dispatch(roomSlice.actions.updatePlayers(players));
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
  socket.off("error", console.error);

  return (store) => (next) => (action) => {
    // HERE RECEIVE FROM SERVER
    if (!isListeningToEvents) {
      socket.on("connect", connect);
      socket.on("game:update", onUpdateGame);
      socket.on("game:spectrums", onSpectrums);
      socket.on("game:end", onEndGame);
      socket.on("room:master", onMaster);
      socket.on("room:players", onPlayers);
      socket.on("error", console.error);

      isListeningToEvents = true;
    }
    // BELOW SEND TO SERVER
    switch (action.type) {
      case "room:create":
        if (socket.connected) {
          socket.emit("room:create", action.payload, (response) => {
            console.log("room:create emit: ", response, action.payload);
            store.dispatch(roomSlice.actions.createRoom(response));
          });
        }
        break;
      case "room:join":
        if (socket.connected) {
          socket.emit("room:join", action.payload, (response) => {
            console.log("room:join emit:", action.payload, response);

          })
        }
        break;
      default:
        next(action);
    }
  };
};

const store = configureStore({
  reducer: { game: gameSlice.reducer, room: roomSlice.reducer },
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
