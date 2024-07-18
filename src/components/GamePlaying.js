import "../index.css";
import Question from "./Question";

export default function GamePlaying(props) {
  console.log(props);

  const allQuestions = props.data.map((data, index) => {
    return (
      <Question
        data={data}
        saveAnswer={props.saveAnswer}
        id={index}
        answerTrack={props.answerTrack[index]}
        status={props.status}
      />
    );
  });

  return (
    <main>
      {allQuestions}
      <div className="bottom-container">
        {props.status === "completed" && (
          <h3 className="no-of-correct-ans">
            You scored {props.noOfCorrectAns}/{props.noOfQuestionsToAnswers}{" "}
            correct answers
          </h3>
        )}
        <button
          className={
            props.allowedToCheckAnswers
              ? "btn-check-answer ans-check-allowed"
              : "btn-check-answer"
          }
          onClick={props.checkAnswers}
        >
          {props.status === "playing" ? "Check answers" : "Play again"}
        </button>
      </div>
    </main>
  );
}
