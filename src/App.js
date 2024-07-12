import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import GamePlaying from "./components/GamePlaying";

import { shuffleArray } from "./functions.js";
import { decode } from "html-entities";

import "./index.css";

function App() {
  const [gameOptions, setGameOptions] = useState({
    amount: "5",
    category: "0",
    difficulty: "0",
    type: "0",
  });

  const [status, setStatus] = useState("notStarted");
  const [properData, setProperData] = useState([]);

  // useEffect(() => {
  //   callAPI(gameOptions);
  // }, []);

  function callAPI(param) {
    fetch(
      `https://opentdb.com/api.php?amount=${param.amount}&category=${param.category}&difficulty=${param.difficulty}&type=${param.type}`
    )
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          alert("try again after 5 seconds");
        }
        return response.json();
      })
      .then((data) => {
        // setProperData(data.results);
        console.log(data);
        getProperData(data.results);
      });
  }

  function getProperData(results) {
    console.log(results);

    let returnObj = results.map((result) => {
      return {
        type: result.type,
        question: decode(result.question),
        correct_answer: decode(result.correct_answer),
        all_answers: shuffleArray(
          result.incorrect_answers,
          result.correct_answer
        ),
      };
    });

    console.log(returnObj);

    setProperData(returnObj);
  }

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

  function startGame() {
    setStatus("playing");
    callAPI(gameOptions);
  }

  const [selectedOptions, setSelectedOptions] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });

  function selectOption(event) {
    console.log("selected");

    // event.target.className = event.target.className + " selected";
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

      {status === "playing" && (
        <GamePlaying data={properData} selectOption={selectOption} />
      )}
    </>
  );
}

export default App;
