import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import GamePlaying from "./components/GamePlaying";

import { addOneAndShuffle } from "./functions.js";
import { decode } from "html-entities";

import "./index.css";

function App() {
  const [gameOptions, setGameOptions] = useState({
    amount: "5",
    category: "0",
    difficulty: "0",
    type: "0",
  });

  const [status, setStatus] = useState("notStarted"); // could be either "notStarted" , "playing" or "completed" only

  const [properData, setProperData] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [allowedToCheckAnswers, setAllowedToCheckAnswers] = useState(false);

  useEffect(() => {
    console.log(Object.keys(selectedOptions));
    Object.keys(selectedOptions).length === 5 && setAllowedToCheckAnswers(true);
  }, [selectedOptions]);

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
        console.log(data);
        getProperData(data.results);
      });
  }

  function getProperData(rawData) {
    console.log(rawData);

    let returnObj = rawData.map((data) => {
      return {
        question: decode(data.question),
        correct_answer: decode(data.correct_answer),
        all_answers: addOneAndShuffle(
          data.incorrect_answers,
          data.correct_answer
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

  function saveAnswer(event, option) {
    console.log(selectedOptions);
    console.log(event.target);
    console.log(option);

    if (status !== "playing") {
      return;
    }
    setSelectedOptions((prevState) => {
      return { ...prevState, [event.target.id]: option };
    });
  }

  const [noOfCorrectAns, setNoOfCorrectAns] = useState(0);
  const [answerTrack, setAnswerTrack] = useState([]);

  function checkAnswers() {
    if (status === "completed") {
      return playAgain();
    }

    if (Object.keys(selectedOptions).length !== 5) {
      return;
    }
    console.log("Checking answers");
    setStatus("completed");

    let correctAns = 0;
    let track = [];

    for (let i = 0; i < 5; i++) {
      console.log(selectedOptions[i]);
      console.log(properData[i].correct_answer);

      if (selectedOptions[i] === properData[i].correct_answer) {
        console.log("equal answer");
        correctAns++;
        track.push("assets/correct-answer.svg");
      } else {
        track.push("assets/wrong-answer.svg");
      }
    }
    setNoOfCorrectAns(correctAns);
    setAnswerTrack(track);
  }

  function playAgain() {
    setStatus("notStarted");
    setSelectedOptions({});
    setAllowedToCheckAnswers(false);
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

      {status !== "notStarted" && (
        <GamePlaying
          data={properData}
          saveAnswer={saveAnswer}
          allowedToCheckAnswers={allowedToCheckAnswers}
          checkAnswers={checkAnswers}
          answerTrack={answerTrack}
          status={status}
          noOfCorrectAns={noOfCorrectAns}
        />
      )}
    </>
  );
}

export default App;
