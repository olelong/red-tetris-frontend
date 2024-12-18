import * as React from 'react';
import bg from "../assets/bg-404.png";
import bgRepeat from "../assets/bg-404-repeat.png";
import "../styles/App.css";

export default function Error404Page() {
  return (
    <div
      style={{
        backgroundImage: `url(${bgRepeat})`,
      }}
      className="app-div"
    >
      <div
        style={{
          backgroundImage: `url(${bg})`,
          zIndex: "2",
        }}
        className="background"
      >
        <div
          style={{
            margin: "0",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>404 :</h1>
          <p>This page doesnt exist</p>
        </div>
      </div>
    </div>
  );
}
