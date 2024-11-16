import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/App.css";
import Board from "./Board.jsx";
import { socket } from "../socket.js";
import { useDispatch, useSelector } from "react-redux";

export default function App() {
  const isConnected = useSelector((state) => state.connect.isConnected);
  const { roomId, userId } = useParams();
  const dispatch = useDispatch();
  // const { isSolo, setIsSolo } = useState(roomId && userId ? false : true);

  useEffect(() => {
    // function onConnect() {
    //   console.log("in onConnect");
    //   console.log(socket?.connected, isConnected, socket);
    //   setIsConnected(true);
    // }
    dispatch({
      type: "connect",
      // params: () => {
      //   console.log("in onConnect");
      //   console.log(socket?.connected, isConnected, socket);
      //   setIsConnected(true);
      // },
    });

    // socket.on("connect", onConnect);
    if (isConnected || socket.connected) {
      dispatch({
        type: "room:create",
        payload: { roomId, userId },
      });
      // socket.emit("room:create", { roomId, userId }, (response) => {
      //   console.log("Res: ", response);
      // });
    }
    return () => {
      dispatch({
        type: "disconnect",
      });
      // socket.off("connect", onConnect);
    };
  }, [isConnected]);

  return (
    <div>
      <h1>Red Tetris</h1>
      <Board />
    </div>
  );
}

// import { useSelector, useDispatch } from "react-redux";
// import { updateUsername, updateRoomName, reset, createRoom } from "../store/store";

// const room = useSelector((state) => state.string.room);
// const username = useSelector((state) => state.string.username);
// const dispatch = useDispatch();

/* <h2>
        Room : {room}, username: {username}
      </h2>
      <button
        onClick={() => dispatch(updateRoomName())}
        style={{ margin: "0 10px" }}
      >
        Update room
      </button>
      <button onClick={() => dispatch(updateUsername())}>
        Update Username
      </button>

      <button onClick={() => dispatch(reset())}>Reset</button>

      <button onClick={() => dispatch(createRoom())}>create a room</button> */
