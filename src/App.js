import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import "./index.css";
function App() {
  const [gameOptions, setGameOptions] = useState({
    amount: "5",
    category: "0",
    difficulty: "0",
    type: "0",
  });

  const [status, setStatus] = useState("notStarted");

  useEffect(() => {
    callAPI(gameOptions);
  }, []);

  function handleChange(event) {
    console.log(event.target.value);

    const { name, value } = event.target;

    setGameOptions((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function callAPI(param) {
    fetch(
      `https://opentdb.com/api.php?amount=${param.amount}&category=${param.category}&difficulty=${param.difficulty}&type=${param.type}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  function startGame() {
    setStatus("started");
    callAPI(gameOptions);
  }

  return (
    <>
      <Blobs />

      {status === "notStarted" && (
        <GameIntro
          onChange={handleChange}
          data={gameOptions}
          startGame={startGame}
        />
      )}
    </>
  );
}

export default App;
