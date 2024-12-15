import { configureStore, createSlice } from "@reduxjs/toolkit";
import { socket } from "../socket";

const roomSlice = createSlice({
  name: "room",
  initialState: {
    // Send to the server:
    isRoomCreated: undefined,
    joinedRoom: { joined: false, reason: "" },

    // Receive from server:
    players: [""],
    master: "",
  },
  reducers: {
    // Send to the server:
    createRoom: (state, action) => {
      state.isRoomCreated = action.payload;
    },
    joinRoom: (state, action) => {
      state.joinedRoom = action.payload;
    },

    // Receive from server:
    updateMaster: (state, action) => {
      console.log("master is: ", action.payload);
      state.master = action.payload;
    },
    updatePlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

const gameSlice = createSlice({
  name: "game",
  initialState: {
    // Send to the server:
    launch: false,
    move: "",

    // Receive from server:
    connected: false,
    board: [],
    gameOver: undefined,
    spectrums: [{ username: "", spectrum: [] }],
    winner: undefined,
  },
  reducers: {
    // Send to the server:
    launchGame: (state, action) => {
      state.launch = action.payload;
      state.winner = undefined;
    },
    updateMove: (state, action) => {
      state.possibleMoves = action.payload;
    },

    // Receive from server:
    updateConnection: (state, action) => {
      state.connected = action.payload;
    },
    updateBoard: (state, action) => {
      state.board = action.payload;
    },
    updateGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    updateSpectrums: (state, action) => {
      state.spectrums = action.payload;
    },
    updateWinner: (state, action) => {
      state.winner = action.payload;
    },
  },
});

function connect() {
  console.log("Connected to the server");
  store.dispatch(gameSlice.actions.updateConnection(true));
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
      isListeningToEvents = true;
      if (socket.connected && !store.getState().game.connected) connect();
      socket.on("connect", connect);
      socket.on("game:update", onUpdateGame);
      socket.on("game:spectrums", onSpectrums);
      socket.on("game:end", onEndGame);
      socket.on("room:master", onMaster);
      socket.on("room:players", onPlayers);
      socket.on("error", console.error);
    }
    // BELOW SEND TO SERVER
    if (socket.connected) {
      switch (action.type) {
        case "room:create":
          socket.emit("room:create", action.payload, (response) => {
            console.log("room:create emit: ", response, action.payload);
            store.dispatch(roomSlice.actions.createRoom(response));
          });
          break;
        case "room:join":
          socket.emit("room:join", action.payload, (response) => {
            console.log("room:join emit:", action.payload, response);
            store.dispatch(roomSlice.actions.joinRoom(response));
          });
          break;
        case "game:launch":
          socket.emit("game:launch", (response) => {
            console.log("game:launch emit:", response);
            store.dispatch(gameSlice.actions.launchGame(response));
          });
          break;
        case "game:move":
          socket.emit("game:move", action.payload, (response) => {
            console.log("game:move emit:", action.payload, response);
            store.dispatch(gameSlice.actions.updateMove(response));
          });
          break;
        default:
          next(action);
      }
    }
  };
};

const store = configureStore({
  reducer: { game: gameSlice.reducer, room: roomSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(socket)),
});

// export const {launchGame} = gameSlice.actions;
export default store;
// Explications de WAEL:
// function socketMiddleware(socket) {
//   return function firstFn(next) {
//     return function secondFn(action) {
//     }
//   }
// }
