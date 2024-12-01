import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Board from "./Board.jsx";
import { socket } from "../socket.js";

import "../styles/App.css";
import bg from "../assets/background.png";

export default function App() {
  const gameInfos = useSelector((state) => state.game);
  // const board = useSelector((state) => state.game.board);
  const { roomId, userId } = useParams();
  const dispatch = useDispatch();
  // const { isSolo, setIsSolo } = useState(roomId && userId ? false : true);

  useEffect(() => {
    dispatch({
      type: "connect",
    });
    if (socket.connected) {
      dispatch({
        type: "room:create",
        payload: { roomId, userId },
      });
    }
    // console.log("gameInfos: ", gameInfos);

    return () => {};
  }, [dispatch, roomId, userId]);

  return (
    <div className="app-div">
      <img className="background" alt="Background of tetris game, in watercolor" style={{ backgroundImage: `url(${bg})` }} />
      <h1 className="username-actual">Username</h1>
      <Board />
    </div>
  );
}