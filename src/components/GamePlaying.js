import "../index.css";
import Question from "./Question";

export default function GamePlaying(props) {
  console.log(props);

  const questionBlock = props.data.map((data, index) => {
    return <Question data={data} handleClick={props.handleClick} id={index} />;
  });

  return (
    <main>
      {questionBlock}
      <button
        className={
          props.allowedToCheckAnswers
            ? "btn-check-answer ans-check-allowed"
            : "btn-check-answer"
        }
        onClick={props.checkAnswers}
      >
        Check answers
      </button>
    </main>
  );
}
