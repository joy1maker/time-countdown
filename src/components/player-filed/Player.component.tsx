import { useRef, useState } from 'react';
import "./player.styles.css";
export default function Player() {
  const playerRef = useRef<HTMLInputElement>(null);
  const [playerName, setPlayerName] = useState("unknown entity");

  const handelClick = () => {
    setPlayerName(playerRef.current!.value);
  }

  return (
    <section id="player">
      <h2>Welcome {playerName}</h2>
      <p>
        <input type="text" ref={playerRef} />
        <button onClick={handelClick}>Set Name</button>
      </p>
    </section>
  );
}
