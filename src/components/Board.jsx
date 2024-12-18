import * as React from 'react';
import { useSelector } from "react-redux";

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

const fruitsThemeMap = [
  "none", // Empty
  `url(${fruitBaies})`, // Cyan
  `url(${fruitMyrtille})`, // Blue
  `url(${fruitOrange})`, // Orange
  `url(${fruitLemon})`, // Yellow
  `url(${fruitKiwi})`, // Green
  `url(${fruitFigue})`, // Purple
  `url(${fruitStrawberry})`, // Red
  `url(${fruitPenalty})`, // Penalty grey
];

const catThemeMap = [
  "none", // Empty
  `url(${catLightBlue})`, // Cyan
  `url(${catBlue})`, // Blue
  `url(${catOrange})`, // Orange
  `url(${catYellow})`, // Yellow
  `url(${catGreen})`, // Green
  `url(${catPurple})`, // Purple
  `url(${catRed})`, // Red
  `url(${catPenalty})`, // Penalty grey
];

const fairiesThemeMap = [
  "none", // Empty
  `url(${fairyCyan})`, // Cyan
  `url(${fairyBlue})`, // Blue
  `url(${fairyOrange})`, // Orange
  `url(${fairyYellow})`, // Yellow
  `url(${fairyGreen})`, // Green
  `url(${fairyPurple})`, // Purple
  `url(${fairyRed})`, // Red
  `url(${fairyPenalty})`, // Penalty grey
];

const theme = [catThemeMap, fruitsThemeMap, fairiesThemeMap][
  Math.floor(Math.random() * 3)
];

export default function Board() {
  const boardInfos = useSelector((state) => state.game.board);

  return (
    <div className="board-container">
      <div className="grid-container">
        {boardInfos &&
          boardInfos.map((num, index) => (
            <div
              key={index}
              className="grid-item"
              style={{
                backgroundColor: num === 8 ? "#cdd7e0" : "",
                backgroundImage: theme[num],
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          ))}
      </div>
    </div>
  );
}
