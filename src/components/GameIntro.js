export default function GameIntro(props) {
  return (
    <section>
      <h1>Quiziical</h1>
      <p>Answer the questions and test your knowledge!</p>

      <label>
        Category
        <select
          name="category"
          id="category"
          value={props.data.category}
          onChange={props.onChange}
        >
          <option value="">Any Category</option>
          <option value="1">one</option>
          <option value="2">two</option>
        </select>
      </label>
      <button onClick={props.startGame}>Start Game</button>
    </section>
  );
}
