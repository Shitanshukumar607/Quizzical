import { useState, useEffect } from "react";
import Blobs from "./components/Blobs";
import "./index.css";
function App() {
  let o;
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=27&difficulty=easy")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <>
      <Blobs />
    </>
  );
}

export default App;
