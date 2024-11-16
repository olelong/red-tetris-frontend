import { useState, useEffect } from "react";
import { socket } from "../socket.js";

import "../styles/Board.css";
import kiwi from "../assets/kiwi.png";
import redCat from "../assets/red-cat.png";
import strawberry from "../assets/strawberry.png";

const colorMap = {
  0: "#ffffff", // Empty
  1: "#7CC6FE", // Cyan
  2: "#0081A7", // Blue
  3: "#FFAA5A", // Orange
  4: "#FFD25A", // Yellow
  //   5: "#BDF7B7", // Green
  //   6: "#C6C8EE", // Purple
  //   7: "#FF5154", // Red
  8: "#B5BEC6", // Penalty grey
};

const imageMap = {
  0: "none", // Empty
  1: "none", // Cyan
  2: "none", // Blue
  3: "none", // Orange
  4: "none", // Yellow
  5: `url(${kiwi})`, // Green
  6: `url(${strawberry})`, // Purple
  7: `url(${redCat})`, // Red
  8: "none", // Penalty grey
};

export default function Board() {
  const [boardInfos, setBoardInfos] = useState([]);
  useEffect(() => {
    if (boardInfos.length <= 0) {
      function updateGame(data) {
        setBoardInfos(data?.board);
        console.log("game update ", boardInfos, data);
      }
      socket.on("game:update", updateGame);

      return () => {
        socket.off("game:update", updateGame);
      };
    }
  }, [boardInfos]);

  return (
    <div className="grid-container">
      {boardInfos.map((num, index) => (
        <div
          key={index}
          className="grid-item"
          style={{
            backgroundColor: colorMap[num] || "#ffffff",
            backgroundImage: imageMap[num],
            backgroundSize: "cover",
          }}
        />
      ))}
    </div>
  );
}
