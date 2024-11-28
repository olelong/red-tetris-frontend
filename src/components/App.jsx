import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Board from "./Board.jsx";
// import { socket } from "../socket.js";

import "../styles/App.css";
import bg from "../assets/background.png";

export default function App() {
  const isConnected = useSelector((state) => state.connect.isConnected);
  // const board = useSelector((state) => state.game.board);
  const { roomId, userId } = useParams();
  const dispatch = useDispatch();
  // const { isSolo, setIsSolo } = useState(roomId && userId ? false : true);

  useEffect(() => {
    dispatch({
      type: "connect",
    });
    if (isConnected) {
      dispatch({
        type: "room:create",
        payload: { roomId, userId },
      });
    }
    return () => {
      dispatch({
        type: "disconnect",
      });
    };
  }, [isConnected, dispatch, roomId, userId]);

  return (
    <div className="app-div">
      <img className="background" style={{ backgroundImage: `url(${bg})` }} />
      {/* <h1>Red Tetris</h1> */}
      <Board />
    </div>
  );
}
