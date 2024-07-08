import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import "./index.css";
function App() {
  const [details, setDetails] = useState({
    category: "",
    difficulty: "easy",
    amount: "5",
  });

  console.log(details);

  useEffect(() => {
    callAPI(details);
  }, []);

  function handleChange(event) {
    console.log(event.target.value);

    const { name, value } = event.target;

    setDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function callAPI(param) {
    fetch(
      `https://opentdb.com/api.php?amount=${param.amount}&category=27&difficulty=${param.difficulty}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <>
      <Blobs />
      <GameIntro
        onChange={handleChange}
        data={details}
        startGame={() => callAPI(details)}
      />
    </>
  );
}

export default App;
