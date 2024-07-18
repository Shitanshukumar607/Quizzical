import { decode } from "html-entities";

// some functions that will be used constantly
export function addOneAndShuffle(array, newElement) {
  array.push(newElement);
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  array = array.map((arr) => decode(arr));

  return array;
}

export async function callAPI({ amount, category, difficulty, type }) {
  try {
    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );

    const data = await response.json();
    console.log(data.results);

    return data.results;
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
