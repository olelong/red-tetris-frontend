import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import Board from "./Board.jsx";

import "../styles/App.css";
import bg from "../assets/bg.png";
import bgRepeat from "../assets/bg-repeat.png";
import masterCrown from "../assets/master-crown.png";

export default function App() {
  const { roomId, userId } = useParams();
  const connected = useSelector((state) => state.game.connected);
  const dispatch = useDispatch();

  const isRoomCreated = useSelector((state) => state.room.isRoomCreated);
  const joinedRoom = useSelector((state) => state.room.joinedRoom);
  const isLaunched = useSelector((state) => state.game.launch);
  const gameOver = useSelector((state) => state.game.gameOver);
  const winner = useSelector((state) => state.game.winner);
  const isMaster =
    useSelector((state) => state.room.master) === (userId || "[Solo]");

  useEffect(() => {
    console.log("render!");
    if (!connected)
      dispatch({
        type: "connect",
      });
    if (connected && !isLaunched) {
      const solo = !roomId && !userId;
      if (isRoomCreated === undefined) {
        dispatch({
          type: "room:create",
          payload: { room: roomId, username: userId },
        });
      }

      if (
        !solo &&
        isRoomCreated === false &&
        !joinedRoom.joined &&
        !joinedRoom.reason
      ) {
        dispatch({
          type: "room:join",
          payload: { room: roomId, username: userId },
        });
      }
    }

    console.log("launched? ", isLaunched);

    return () => {};
  }, [
    dispatch,
    connected,
    roomId,
    userId,
    joinedRoom,
    isRoomCreated,
    isLaunched,
  ]);

  useEffect(() => {
    const manageEvents = (e) => {
      e.preventDefault();
      const events = {
        ArrowUp: "rotation",
        ArrowRight: "right",
        ArrowDown: "soft drop",
        ArrowLeft: "left",
        " ": "hard drop",
      };

      dispatch({
        type: "game:move",
        payload: { move: events[e.key] },
      });
    };

    if (isLaunched && !gameOver)
      document.addEventListener("keydown", manageEvents);

    return () => document.removeEventListener("keydown", manageEvents);
  }, [dispatch, gameOver, isLaunched]);

  function launchGame() {
    const solo = !roomId && !userId;
    if (solo || (!solo && joinedRoom)) {
      dispatch({
        type: "game:launch",
      });
    }
  }

  return (
    <div className="app-div" style={{ backgroundImage: `url(${bgRepeat})` }}>
      <div className="background" style={{ backgroundImage: `url(${bg})` }} />
      <div className="username-master-div">
        {isMaster && (
          <img
            alt="A crown to show who is the master of the game"
            src={masterCrown}
            style={{
              heigth: "10px",
            }}
          />
        )}
        <h1 className="username-actual">{userId ? userId : "Solo"}</h1>
      </div>

      {(!isLaunched || gameOver) && isMaster && (
        <Button
          variant="contained"
          onClick={() => {
            launchGame();
          }}
          className="launch-button"
        >
          {gameOver ? "Restart" : "Start"}
        </Button>
      )}
      {isLaunched && !gameOver && <Board />}
      {(winner || gameOver) && (
        <h1 className="end-game-p">
          {winner === userId ? "You Win! 🏆" : "Game Over 😭"}
        </h1>
      )}
    </div>
  );
}
