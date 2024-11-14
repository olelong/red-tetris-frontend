import { useSelector, useDispatch } from "react-redux";
import { updateUsername, updateRoomName, reset, createRoom } from "../store/store";
import "../styles/App.css";

export default function App() {
  const room = useSelector((state) => state.string.room);
  const username = useSelector((state) => state.string.username);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Red Tetris</h1>
      <h2>
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

      <button onClick={() => dispatch(createRoom())}>create a room</button>
    </div>
  );
}
