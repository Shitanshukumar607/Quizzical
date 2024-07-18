import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import GamePlaying from "./components/GamePlaying";

import { addOneAndShuffle, callAPI } from "./functions.js";
import { decode } from "html-entities";

import "./index.css";

function App() {
  const [gameOptions, setGameOptions] = useState({
    amount: "5",
    category: "0",
    difficulty: "0",
    type: "0",
  });

  const [status, setStatus] = useState("notStarted"); // could be either "notStarted" , "playing" , "fetchingData" or "completed" only

  const [properData, setProperData] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [errorMessage, setErrorMessage] = useState(null);

  let noOfQuestionsToAnswers = Number(gameOptions.amount);
  let noOfCurrentlyAnsweredQuestions = Object.keys(selectedOptions).length;

  let allowedToCheckAnswers =
    noOfCurrentlyAnsweredQuestions === noOfQuestionsToAnswers;

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

  async function startGame() {
    setStatus("fetchingData");

    let data = await callAPI(gameOptions);
    console.log(data);

    if (data == []) {
      getProperData(data.results);
      setStatus("playing");
    } else {
      setErrorMessage(
        "The API doesn't have enough questions for your query. Refresh the website and try again."
      );
    }
  }

  function saveAnswer(event, option) {
    // console.log(selectedOptions);
    // console.log(event.target);
    // console.log(option);

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

    if (noOfCurrentlyAnsweredQuestions !== noOfQuestionsToAnswers) {
      console.log("not selected enough answers");
      return;
    }
    console.log("Checking answers");
    setStatus("completed");

    let correctAns = 0;
    let track = [];

    for (let i = 0; i < noOfQuestionsToAnswers; i++) {
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
    allowedToCheckAnswers = false;
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

      {status === "fetchingData" && (
        <p className="fetching-data">
          {errorMessage ? errorMessage : "Getting questions..."}
        </p>
      )}

      {(status === "playing" || status === "completed") && (
        <GamePlaying
          data={properData}
          saveAnswer={saveAnswer}
          allowedToCheckAnswers={allowedToCheckAnswers}
          checkAnswers={checkAnswers}
          answerTrack={answerTrack}
          status={status}
          noOfCorrectAns={noOfCorrectAns}
          noOfQuestionsToAnswers={noOfQuestionsToAnswers}
        />
      )}
    </>
  );
}

export default App;
