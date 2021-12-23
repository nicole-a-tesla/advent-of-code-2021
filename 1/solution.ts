import getInputString from "../fetchInputString";

const inputString: string = getInputString("1/input.txt");
const inputArray: string[] = inputString.split(/\r?\n/);
const intArray: number[] = inputArray.map(s => parseInt(s));

function countIncreases(arr: number[]): number {
  let increaseCounter = 0;
  let lastN = arr[0];

  for (let n of arr.slice(1)) {
    if (n > lastN) {
      increaseCounter++;
    }
    lastN = n;
  }
  return increaseCounter;
}

const partOneSolution: number = countIncreases((intArray));// 1298
console.log(partOneSolution);

function countWindowedIncreases(arr: number[]): number {
  const windowedSums: number[] = getWindowedSums(arr);
  return countIncreases(windowedSums);
}

function getWindowedSums(arr: number[]): number[] {
  let windowedSums = [];
  let pointer = 0;

  while (pointer <= arr.length - 3) {
    windowedSums.push(arr[pointer] + arr[pointer + 1] + arr[pointer + 2]);
    pointer++;
  }

  return windowedSums;
}
 const partTwoSolution: number = countWindowedIncreases(intArray); // 1248
 console.log(partTwoSolution);
