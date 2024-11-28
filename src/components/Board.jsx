import { useState, useEffect } from "react";
import { socket } from "../socket.js";

import "../styles/Board.css";
import redCat from "../assets/catsTheme/red-cat.png";
import blueCat from "../assets/catsTheme/blue-cat.png";
import lightBlueCat from "../assets/catsTheme/light-blue-cat.png";
import greenCat from "../assets/catsTheme/green-cat.png";
import orangeCat from "../assets/catsTheme/orange-cat.png";
import purpleCat from "../assets/catsTheme/purple-cat.png";
import yellowCat from "../assets/catsTheme/yellow-cat.png";
import penaltyCat from "../assets/catsTheme/penalty-cat.png";

// import fairyGreen from "../assets/fairiesTheme/fairyGreen.png";


// import kiwi from "../assets/fruitsTheme/kiwi.png";
// import strawberry from "../assets/fruitsTheme/strawberry.png";

// const fruitThemeMap = {
//   0: "none", // Empty
// 1: `url(${})`, // Cyan
// 2: `url(${})`, // Blue
// 3: `url(${})`, // Orange
// 4: `url(${})`, // Yellow
// 5: `url(${kiwi})`, // Green
// 6: `url(${})`, // Purple
// 7: `url(${strawberry})`, // Red
// 8: `url(${})`, // Penalty grey
// };

const catThemeMap = {
  0: "none", // Empty
  1: `url(${lightBlueCat})`, // Cyan
  2: `url(${blueCat})`, // Blue
  3: `url(${orangeCat})`, // Orange
  4: `url(${yellowCat})`, // Yellow
  5: `url(${greenCat})`, // Green
  6: `url(${purpleCat})`, // Purple
  7: `url(${redCat})`, // Red
  8: `url(${penaltyCat})`, // Penalty grey
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
    <div className="board-container">
      <div className="grid-container">
        {boardInfos.map((num, index) => (
          <div
            key={index}
            className="grid-item"
            style={{
              backgroundColor: num === 8 ? "#cdd7e0" : "#ffffff",
              backgroundImage: catThemeMap[num],
              backgroundSize: "cover",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// const colorMap = {
//   0: "#ffffff", // Empty
//   1: "#7CC6FE", // Cyan
//   2: "#0081A7", // Blue
//   3: "#FFAA5A", // Orange
//   4: "#FFD25A", // Yellow
//   5: "#BDF7B7", // Green
//   6: "#C6C8EE", // Purple
//   7: "#FF5154", // Red
//   8: "#B5BEC6", // Penalty grey
// };
