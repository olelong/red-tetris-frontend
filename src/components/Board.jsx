import { useState, useEffect } from "react";
import { socket } from "../socket.js";

import "../styles/Board.css";
import catRed from "../assets/catsTheme/red-cat.png";
import catBlue from "../assets/catsTheme/blue-cat.png";
import catLightBlue from "../assets/catsTheme/light-blue-cat.png";
import catGreen from "../assets/catsTheme/green-cat.png";
import catOrange from "../assets/catsTheme/orange-cat.png";
import catPurple from "../assets/catsTheme/purple-cat.png";
import catYellow from "../assets/catsTheme/yellow-cat.png";
import catPenalty from "../assets/catsTheme/penalty-cat.png";

import fairyGreen from "../assets/fairiesTheme/fairyGreen.png";
import fairyBlue from "../assets/fairiesTheme/fairyBlue.png";
import fairyCyan from "../assets/fairiesTheme/fairyCyan.png";
import fairyOrange from "../assets/fairiesTheme/fairyOrange.png";
import fairyPurple from "../assets/fairiesTheme/fairyPurple.png";
import fairyRed from "../assets/fairiesTheme/fairyRed.png";
import fairyYellow from "../assets/fairiesTheme/fairyYellow.png";
import fairyPenalty from "../assets/fairiesTheme/fairyPenalty.png";

import fruitKiwi from "../assets/fruitsTheme/kiwi.png";
import fruitStrawberry from "../assets/fruitsTheme/strawberry.png";
import fruitBaies from "../assets/fruitsTheme/baies.png";
import fruitFigue from "../assets/fruitsTheme/figue.png";
import fruitLemon from "../assets/fruitsTheme/lemon.png";
import fruitMyrtille from "../assets/fruitsTheme/myrtille.png";
import fruitOrange from "../assets/fruitsTheme/orange.png";
import fruitPenalty from "../assets/fruitsTheme/durian.png";

const fruitsThemeMap = {
  0: "none", // Empty
  1: `url(${fruitBaies})`, // Cyan
  2: `url(${fruitMyrtille})`, // Blue
  3: `url(${fruitOrange})`, // Orange
  4: `url(${fruitLemon})`, // Yellow
  5: `url(${fruitKiwi})`, // Green
  6: `url(${fruitFigue})`, // Purple
  7: `url(${fruitStrawberry})`, // Red
  8: `url(${fruitPenalty})`, // Penalty grey
};

const catThemeMap = {
  0: "none", // Empty
  1: `url(${catLightBlue})`, // Cyan
  2: `url(${catBlue})`, // Blue
  3: `url(${catOrange})`, // Orange
  4: `url(${catYellow})`, // Yellow
  5: `url(${catGreen})`, // Green
  6: `url(${catPurple})`, // Purple
  7: `url(${catRed})`, // Red
  8: `url(${catPenalty})`, // Penalty grey
};

const fairiesThemeMap = {
  0: "none", // Empty
  1: `url(${fairyCyan})`, // Cyan
  2: `url(${fairyBlue})`, // Blue
  3: `url(${fairyOrange})`, // Orange
  4: `url(${fairyYellow})`, // Yellow
  5: `url(${fairyGreen})`, // Green
  6: `url(${fairyPurple})`, // Purple
  7: `url(${fairyRed})`, // Red
  8: `url(${fairyPenalty})`, // Penalty grey
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
              backgroundImage: fruitsThemeMap[num], //catThemeMap[num],
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
