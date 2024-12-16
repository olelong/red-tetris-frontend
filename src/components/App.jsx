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
  const connected = useSelector((state) => state.game.connected);
  const dispatch = useDispatch();

  const isRoomCreated = useSelector((state) => state.room.isRoomCreated);
  const joinedRoom = useSelector((state) => state.room.joinedRoom);
  const isLaunched = useSelector((state) => state.game.launch);
  const gameOver = useSelector((state) => state.game.gameOver);
  const winner = useSelector((state) => state.game.winner);
  const isMaster =
    useSelector((state) => state.room.master) === (userId || "[Solo]");
  const players = useSelector((state) => state.room.players);
  const spectrums = useSelector((state) => state.game.spectrums);
  const error = useSelector((state) => state.room.error);

  const reasonNotJoined = {
    "Room Not Found": "This room doesn't exist.",
    "Already in a Room": "You're already in a room.",
    "Username Taken": "This username is already taken.",
    "In Game": "The game has already started.",
    "Room Full": "The room is full. Try another one.",
  };

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

    if (!gameOver) document.addEventListener("keydown", manageEvents);

    return () => document.removeEventListener("keydown", manageEvents);
  }, [dispatch, gameOver]);

  function launchGame() {
    const solo = !roomId && !userId;
    if (solo || (!solo && joinedRoom)) {
      dispatch({
        type: "game:launch",
      });
    }
  }

  return error ? (
    <Error500Page />
  ) : (
    <div className="app-div" style={{ backgroundImage: `url(${bgRepeat})` }}>
      <div className="background" style={{ backgroundImage: `url(${bg})` }} />
      {/* Manage errors when joining a room */}
      {!joinedRoom.joined && !isRoomCreated && userId && roomId ? (
        <div
          className="bg-error-joined"
          style={{ backgroundImage: `url(${bgError})` }}
        >
          <h1 className="error-joined-room">
            {joinedRoom.reason ? reasonNotJoined[joinedRoom.reason] : ""}
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
          {players.length > 1 && (
            <div className="spectrum-div spectrum-div-left">
              {spectrums
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
            {spectrums
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
          {gameOver !== false &&
            (isMaster || players.length === 0 ? (
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
          {!gameOver && <Board />}
          {(gameOver || winner) && userId && roomId && players.length > 1 && (
            <div>
              <h1
                className={
                  "end-game-p " +
                  (winner === userId ? " end-game-win" : " end-game-lose")
                }
              >
                {winner === userId ? "You Win!" : "Game Over"}
              </h1>
              <img
                className="end-game-cloud"
                src={winner === userId ? winCloud : loseCloud}
                alt=""
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
