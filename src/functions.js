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
