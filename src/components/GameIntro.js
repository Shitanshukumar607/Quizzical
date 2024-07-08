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
          <option value="one">one</option>
          <option value="two">two</option>
        </select>
      </label>
    </section>
  );
}
