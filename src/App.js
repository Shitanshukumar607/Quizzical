import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import GameIntro from "./components/GameIntro";
import "./index.css";
function App() {
  const [details, setDetails] = useState({
    category: "",
    difficulty: "",
  });

  // useEffect(() => {
  //   fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }, []);

  function handleChange(event) {
    console.log("change");
    console.log(event.target.value);

    setDetails((prevState) => {
      return {
        ...prevState,
        category: event.target.value,
      };
    });

    console.log(details);
  }

  return (
    <>
      <Blobs />
      <GameIntro onChange={handleChange} data={details} />
    </>
  );
}

export default App;
