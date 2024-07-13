import { useState } from "react";
import "../index.css";

export default function Question(props) {
  console.log(props.data);
  console.log(props.data.all_answers);
  const [selectedOptions, setSelectedOptions] = useState(null);

  function updateState(index) {
    console.log("state updated");
    setSelectedOptions(index);
  }

  return (
    <div className="question-container">
      <p className="question">{props.data.question}</p>
      <div className="options-div">
        {props.data.all_answers.map((option, index) => {
          return (
            <button
              onClick={(event) => {
                updateState(props.data.all_answers[index]);
                props.handleClick(event, props.data.all_answers[index]);
              }}
              className={
                props.data.all_answers[index] === selectedOptions
                  ? "option-button option-selected"
                  : "option-button"
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
  );
}
