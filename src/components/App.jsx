import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import Board from "./Board.jsx";
import Spectrum from "./Spectrum.jsx";
import Error500Page from "./Error500Page.jsx";

import "../styles/App.css";
import bg from "../assets/bg.png";
import bgRepeat from "../assets/bg-repeat.png";
import bgError from "../assets/bg-error.png";
import masterCrown from "../assets/master-crown.png";
import winCloud from "../assets/win-cloud.png";
import loseCloud from "../assets/lose-cloud.png";

export default function App() {
  const { roomId, userId } = useParams();
  const isMaster =
    useSelector((state) => state.room.master) === (userId || "[Solo]");
  const gameState = useSelector((state) => state.game);
  const roomState = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const reasonNotJoined = {
    "Room Not Found": "This room doesn't exist.",
    "Already in a Room": "You're already in a room.",
    "Username Taken": "This username is already taken.",
    "In Game": "The game has already started.",
    "Room Full": "The room is full. Try another one.",
  };

  useEffect(() => {
    if (!gameState.connected)
      dispatch({
        type: "connect",
      });
    if (gameState.connected && !gameState.launch) {
      const solo = !roomId && !userId;
      if (roomState.isRoomCreated === undefined) {
        dispatch({
          type: "room:create",
          payload: { room: roomId, username: userId },
        });
      }

      if (
        !solo &&
        roomState.isRoomCreated === false &&
        !roomState.joinedRoom.joined &&
        !roomState.joinedRoom.reason
      ) {
        dispatch({
          type: "room:join",
          payload: { room: roomId, username: userId },
        });
      }
    }

    return () => {};
  }, [
    dispatch,
    gameState.connected,
    roomId,
    userId,
    roomState.joinedRoom,
    roomState.isRoomCreated,
    gameState.launch,
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

      if (!events[e.key]) {
        return;
      }

      dispatch({
        type: "game:move",
        payload: { move: events[e.key] },
      });
    };

    if (!gameState.gameOver) document.addEventListener("keydown", manageEvents);
    return () => document.removeEventListener("keydown", manageEvents);
  }, [dispatch, gameState.gameOver]);

  function launchGame() {
    const solo = !roomId && !userId;
    if (
      solo ||
      (!solo && roomState.joinedRoom) ||
      roomState.players.length === 1
    ) {
      dispatch({
        type: "game:launch",
      });
    }
  }
  useEffect(() => {
    console.log("HERE", gameState.winner, gameState.gameOver, gameState.launch);
  }, [gameState.gameOver, gameState.launch, gameState.winner]);

  return roomState.error ? (
    <Error500Page />
  ) : (
    <div className="app-div" style={{ backgroundImage: `url(${bgRepeat})` }}>
      <div className="background" style={{ backgroundImage: `url(${bg})` }} />
      {/* Manage errors when joining a room */}
      {!roomState.joinedRoom.joined &&
      !roomState.isRoomCreated &&
      userId &&
      roomId ? (
        <div
          className="bg-error-joined"
          style={{ backgroundImage: `url(${bgError})` }}
        >
          <h1 className="error-joined-room">
            {roomState.joinedRoom.reason
              ? reasonNotJoined[roomState.joinedRoom.reason]
              : ""}
          </h1>
        </div>
      ) : (
        <div className="app-div">
          {/* Display username of current player */}
          <div className="username-master-div">
            {isMaster && userId && (
              <img
                alt="A crown to show who is the master of the game"
                src={masterCrown}
                style={{
                  heigth: "10px",
                }}
              />
            )}
            <h1 className="username-actual">{userId ? userId : ""}</h1>
          </div>

          {/* Diplaying spectrums of other players */}
          {roomState.players.length > 1 && (
            <div className="spectrum-div spectrum-div-left">
              {gameState.spectrums
                .filter(({ username }) => username !== userId)
                .filter((_, i) => i < 6)
                .map((player, index) => (
                  <Spectrum
                    userId={userId}
                    username={player.username}
                    spectrum={player.spectrum}
                    id={index}
                    key={index}
                  />
                ))}
            </div>
          )}

          <div className="spectrum-div spectrum-div-right">
            {gameState.spectrums
              .filter(({ username }) => username !== userId)
              .filter((_, i) => i >= 6)
              .map((player, index) => (
                <Spectrum
                  userId={userId}
                  username={player.username}
                  spectrum={player.spectrum}
                  id={index + 6}
                  key={index}
                />
              ))}
          </div>

          {/* Launch, update and manage the Game */}
          {(gameState.gameOver === undefined ||
            (gameState.gameOver === true && gameState.winner !== undefined)) &&
            (isMaster || roomState.players.length === 1 ? (
              <Button
                variant="contained"
                onClick={() => {
                  launchGame();
                }}
                className="launch-button"
              >
                Start
              </Button>
            ) : (
              <Button variant="outlined" className="waiting-button" disabled>
                Waiting master to start
              </Button>
            ))}
          {!gameState.gameOver && gameState.winner === undefined && <Board />}
          {(gameState.gameOver || gameState.winner) &&
            userId &&
            roomId &&
            roomState.players.length > 1 && (
              <div>
                <h1
                  className={
                    "end-game-p " +
                    (gameState.winner === userId
                      ? " end-game-win"
                      : " end-game-lose")
                  }
                >
                  {gameState.winner === userId ? "You Win!" : "Game Over"}
                </h1>
                <img
                  className="end-game-cloud"
                  src={gameState.winner === userId ? winCloud : loseCloud}
                  alt="Clouds for game over"
                />
              </div>
            )}
        </div>
      )}
    </div>
  );
}
