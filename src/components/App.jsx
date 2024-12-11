import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

import Board from "./Board.jsx";

import "../styles/App.css";
import bg from "../assets/bg.png";
import bgRepeat from "../assets/bg-repeat.png";

// function checkId(id) {
//   if (id.length > 1 && id.length <= 10) return true;
//   else return false;
// }

export default function App() {
  const { roomId, userId } = useParams();
  const connected = useSelector((state) => state.game.connected);
  const dispatch = useDispatch();
  // const [isSolo, setIsSolo] = useState(true);

  const isRoomCreated = useSelector((state) => state.room.isRoomCreated);
  const joinedRoom = useSelector((state) => state.room.joinedRoom);
  const isLaunched = useSelector((state) => state.game.launch);
  const gameOver = useSelector((state) => state.game.gameOver);

  // if ((checkId(userId) && checkId(roomId)) || solo)

  useEffect(() => {
    console.log("render!");
    dispatch({
      type: "connect",
    });
    console.log("begin: ", isLaunched, connected);
    if (connected && !isLaunched) {
      const solo = !roomId && !userId;
      // setIsSolo(solo);
      if (isRoomCreated === undefined) {
        dispatch({
          type: "room:create",
          payload: { roomId, userId },
        });
      }
      // console.log(solo, isRoomCreated, joinedRoom);
      if (!solo && isRoomCreated === false) {
        dispatch({
          type: "room:join",
          payload: { roomId, userId },
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
      <h1 className="username-actual">{userId ? userId : "Solo"}</h1>
      <Button
        variant="contained"
        onClick={() => {
          launchGame();
        }}
        className="launch-button"
      >
        Launch
      </Button>
      {isLaunched && <Board />}
    </div>
  );
}
