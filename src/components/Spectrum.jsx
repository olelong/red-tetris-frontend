import "../styles/Spectrums.css";

const colors = [
  " #da8a6f",
  "	#f1c6f1",
  "	#a3d8d0",
  "	#ffb3ab",
  "	#f7e284",
  "	#a7c6ed",
  " #ff7f7f",
  " #8b9a7b",
  " #9c4b98",
  " #aeeeee",
  " #d1c6e0",
  " #ffe5b4",
];

export default function Spectrum({ userId, username, spectrum, id }) {
  if (userId === username) return null;
  const color = colors[id];
  const heightsPercent = spectrum
    ? spectrum.map((height) => (height / 20) * 100)
    : Array(10).fill(0);

  return (
    <div className="spectrum-container">
      <h1 className="username">{username}</h1>
      {heightsPercent.map((height, index) => (
        <div
          key={index}
          className="spectrum-bar"
          style={{
            height: `${height}%`,
            backgroundColor: color,
          }}
        />
      ))}
    </div>
  );
}
