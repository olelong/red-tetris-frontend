import { useEffect, useState } from "react";
import "../styles/App.css";
import Board from "./Board.jsx";
import { socket } from "../socket.js";

export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    // function onDisconnect() {
    //   setIsConnected(false);
    // }

    socket.on("connect", onConnect);
    console.log(socket?.connected, isConnected, socket);
    // socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      // socket.off("disconnect", onDisconnect);
    };

    //   socket.on("game:update", (data) => {
    //     console.log("game update:", data);
    //   });
  }, []);

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

{
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
}
