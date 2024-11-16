import { configureStore, createSlice } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import { socket } from "../socket.js";
import { useDispatch } from "react-redux";

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

// const roomSlice = createSlice({
//   name: "string",
//   initialState: {
//     room: "undefined",
//     username: "undefined",
//     players: [],
//     masterName: null,
//   },
//   reducers: {
//     updateUsername: (state) => {
//       state.username = "Pat";
//     },
//     updateRoomName: (state) => {
//       state.room = "01";
//     },
//     reset: (state) => {
//       state.room = undefined;
//       state.username = undefined;
//     },
//   },
// });

// const createRoomSlice = createSlice({
//   name: "createRoom",
//   initialState: {
//     room: undefined,
//     username: undefined,
//   },
//   reducers: {
//     createRoom: (state) => {
//       state.room;
//     },
//   },
// });

// export const { updateUsername, updateRoomName, reset } = roomSlice.actions;
// export const { createRoom } = createRoomSlice.actions;

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

export const socketMiddleware = (socket) => (next) => (action) => {
  switch (action.type) {
    case "connect":
      socket.on("connect", () => {
        console.log("in onConnect");
        useDispatch(setConnected());
      });
      break;
    case "room:create":
      if (socket.connected) {
        socket.emit("room:create", action.payload, (response) => {
          console.log("Res: ", response, action.payload);
        });
      }
      break;
    case "disconnect":
      socket.off("connect", () => {
        useDispatch(setDisconnected());
      });
      break;
    default:
      next(action);
  }
};

// useEffect(() => {
//   socket.on("connect", params);
//   return () => {
//     socket.off("connect", params);
//   };
// }, []);

const store = configureStore({
  // reducer: { room: createRoomSlice.reducer },
  reducer: { connect: connectionSlice.reducer },
  applyMiddleware: socketMiddleware,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(socketMiddleware(socket)),
});

export default store;
