import {
  categories,
  difficulties,
  questionTypes,
  noOfQuestions,
} from "../data";
import "../index.css";

export default function GameIntro(props) {
  const noOfQuestionsElements = noOfQuestions.map((noOfQuestion, index) => {
    return (
      <option key={index} value={noOfQuestion.id}>
        {noOfQuestion.name}
      </option>
    );
  });

  const categoryElements = categories.map((category, index) => {
    return (
      <option key={index} value={category.id}>
        {category.name}
      </option>
    );
  });

  const difficultyElements = difficulties.map((difficulty, index) => {
    return (
      <option key={index} value={difficulty.id}>
        {difficulty.name}{" "}
      </option>
    );
  });

  const questionTypesElements = questionTypes.map((questionType, index) => {
    return (
      <option key={index} value={questionType.id}>
        {questionType.name}
      </option>
    );
  });

  return (
    <section className="game-container">
      <h1 className="game-title">Quiziical</h1>
      <p className="game-description">
        Answer the questions and test your knowledge!
      </p>

      <div className="selection-container">
        <label htmlFor="number">Number of questions</label>
        <select
          name="amount"
          id="number"
          value={props.data.amount}
          onChange={props.onChange}
        >
          {noOfQuestionsElements}
        </select>
      </div>

      <div className="selection-container">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          id="category"
          value={props.data.category}
          onChange={props.onChange}
        >
          {categoryElements}
        </select>
      </div>

      <div className="selection-container">
        <label htmlFor="difficulty">Difficulty </label>
        <select
          name="difficulty"
          id="difficulty"
          value={props.data.difficulty}
          onChange={props.onChange}
        >
          {difficultyElements}
        </select>
      </div>

      <div className="selection-container">
        <label htmlFor="type">Types of questions</label>
        <select
          name="type"
          id="type"
          value={props.data.type}
          onChange={props.onChange}
        >
          {questionTypesElements}
        </select>
      </div>

      <button className="start-game-btn" onClick={props.startGame}>
        Start Game
      </button>
    </section>
  );
}
