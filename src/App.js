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

  const [status, setStatus] = useState("notStarted");
  const [properData, setProperData] = useState([]);

  const [selectedOptions, setSelectedOptions] = useState({});

  const [allowedToCheckAnswers, setAllowedToCheckAnswers] = useState(false);

  // useEffect(() => {
  //   callAPI(gameOptions);
  // }, []);

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
        all_answers: addOneAndShuffle(
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

  function handleClick(event, option) {
    console.log(selectedOptions);
    console.log(event);
    console.log(option);
    setSelectedOptions((prevState) => {
      return { ...prevState, [event.target.id]: option };
    });
  }

  const [noOfCorrectAns, setNoOfCorrectAns] = useState(0);
  const [answerTrack, setAnswerTrack] = useState([]);

  function checkAnswers() {
    if (Object.keys(selectedOptions).length !== 5) {
      return;
    }
    console.log("Checking answers");

    for (let i = 0; i < 5; i++) {
      console.log(selectedOptions[i]);
      console.log(properData[i].correct_answer);

      if (selectedOptions[i] === properData[i].correct_answer) {
        setNoOfCorrectAns(noOfCorrectAns + 1);
        setAnswerTrack((prevState) => {
          return [...prevState, true];
        });
      } else {
        setAnswerTrack((prevState) => {
          return [...prevState, false];
        });
      }
    }
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
        <GamePlaying
          data={properData}
          handleClick={handleClick}
          allowedToCheckAnswers={allowedToCheckAnswers}
          checkAnswers={checkAnswers}
        />
      )}
    </>
  );
}

export default App;
