import { useState } from "react";
import "../index.css";

export default function Question(props) {
  // console.log(props.data);
  const [selectedOptions, setSelectedOptions] = useState(null);

  function selectOption(event, index) {
    if (props.status !== "playing") {
      return;
    }
    console.log(index);
    setSelectedOptions(props.data.all_answers[index]);
    props.saveAnswer(event, props.data.all_answers[index]);
  }

  return (
    <div className="question-container">
      <div>
        <p className="question-text">{props.data.question}</p>
        <div className="options-div">
          {props.data.all_answers.map((option, index) => {
            return (
              <button
                onClick={(event) => {
                  selectOption(event, index);
                }}
                className={
                  (props.data.all_answers[index] === selectedOptions
                    ? "option-button option-selected "
                    : "option-button ") +
                  (props.data.all_answers[index] ===
                    props.data.correct_answer && props.status === "completed"
                    ? " correct-answer-option "
                    : " ") +
                  (props.data.all_answers[index] === selectedOptions &&
                  props.status === "completed"
                    ? "wrong-answer-option "
                    : " ")
                }
                key={index}
                id={props.id}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      {props.status === "completed" && (
        <img className="answer-check-img" src={props.answerTrack} alt=""/>
      )}
    </div>
  );
}
