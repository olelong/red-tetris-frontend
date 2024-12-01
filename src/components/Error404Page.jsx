import bg from "../assets/background-404.png";
import "../styles/App.css";

export default function Error404Page() {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
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
  );
}
