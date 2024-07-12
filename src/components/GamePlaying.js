import "../index.css";

export default function GamePlaying(props) {
  console.log(props);

  const questionBlock = props.data.map((data, index) => {
    return (
      <div className="question-container" key={index}>
        <p className="question">{data.question}</p>
        <div className="options-div">
          {data.all_answers.map((option, Index) => {
            return (
              <button
                onClick={props.selectOption}
                className="option-button"
                key={Index}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    );
  });

  return <main>{questionBlock}</main>;
}
