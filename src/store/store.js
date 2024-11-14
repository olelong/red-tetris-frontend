import { configureStore, createSlice } from "@reduxjs/toolkit";
import io from "socket.io-client";

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

let socket;

const roomSlice = createSlice({
  name: "string",
  initialState: {
    room: "undefined",
    username: "undefined",
    players: [],
    masterName: null,
  },
  reducers: {
    updateUsername: (state) => {
      state.username = "Pat";
    },
    updateRoomName: (state) => {
      state.room = "01";
    },
    reset: (state) => {
      state.room = undefined;
      state.username = undefined;
    },
  },
});


const createRoomSlice = createSlice({
  name: "room",
  initialState: {
    room: undefined,
    username: undefined,
  },
  reducers: {
    createRoom: (state) => {
      socket = io(state.room);
    },
  },
});

export const { updateUsername, updateRoomName, reset } = roomSlice.actions;
export const { createRoom } = createRoomSlice.actions;
const store = configureStore({
  reducer: { string: roomSlice.reducer, room: createRoomSlice.reducer },
});

export default store;
