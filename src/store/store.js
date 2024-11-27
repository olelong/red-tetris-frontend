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

const connectionSlice = createSlice({
  name: "connect",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected: (state) => {
      state.isConnected = true;
    },
    setDisconnected: (state) => {
      state.isConnected = false;
    },
  },
});

export const { setConnected, setDisconnected } = connectionSlice.actions;


export const socketMiddleware = (socket) => {
  let isListeningToEvents = false;

  return (store) => (next) => (action) => {
    console.log(store);
    // HERE RECEIVE FROM SERVER
    if (!isListeningToEvents) {
      console.log(socket.connected);
      socket.on("connect", () => {
        console.log("in onConnect");
        next({ type: "setConnected" });
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
  reducer: { connect: connectionSlice.reducer },
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