import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "../styles/App.css";
import Board from "./Board.jsx";
import { socket } from "../socket.js";

export default function App() {
  const isConnected = useSelector((state) => state.connect.isConnected);
  // const board = useSelector((state) => state.game.board);
  const { roomId, userId } = useParams();
  const dispatch = useDispatch();
  // const { isSolo, setIsSolo } = useState(roomId && userId ? false : true);

  useEffect(() => {
    console.log('oh')
    dispatch({
      type: "connect",
    });
    if (isConnected || socket.connected) {
      dispatch({
        type: "room:create",
        payload: { roomId, userId },
      });
    }
    console.log("isConnected", isConnected);
    return () => {
      dispatch({
        type: "disconnect",
      });
    };
  }, [isConnected, dispatch, roomId, userId]);

  return (
    <div>
      <h1>Red Tetris</h1>
      <Board />
    </div>
  );
}