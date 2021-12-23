import getInputString from "../fetchInputString";
const inputString: string = getInputString("3/input.txt");
const inputArray: string[] = inputString.split(/\r?\n/);
const MOST = "most";
const LEAST = "least";

type Bit = 0 | 1;
type Commonality = typeof MOST | typeof LEAST;

function getMostOrLeastCommonBit(input: string[], bitIndex: number, commonality: Commonality): Bit {
	let bitsArray = input.map(elem => elem[bitIndex]);
  let bits = bitsArray.join("");
	let zeroCount = bits.split("0").length - 1;
  let oneCount = bits.split("1").length - 1;

  if (commonality === MOST) {
    return zeroCount > oneCount
      ? 0
      : 1;
  }

  if (commonality === LEAST) {
    return zeroCount > oneCount
      ? 1
      : 0;
  }
  throw Error("invalid commonality value");
}

function getRate(input: string[], commonality: Commonality): number {
  const prototype = input[0].split("");
  const bitArray = prototype.map((bit, bitIndex) => {
    return getMostOrLeastCommonBit(input, bitIndex, commonality)
  });
  const bitString = bitArray.join("");
  return parseInt(bitString, 2);
  
}

function asBaseTenNum(bitString: string) {
  return parseInt(bitString, 2);
}

const input = inputArray;
const gammaRate = getRate(input, MOST); // 3004
const epsilonRate = getRate(input, LEAST); // 1091
const partOneSolution = gammaRate * epsilonRate; // power consumption = 3277364
console.log(`Power consumption = ${partOneSolution}`);

// Part 2: get life support rating
// ls_rating = o2_gen_rating * co2_scrubber_rating
//
// O2 Rating
function getNumbersWithMatchingBitPosition(
  input: string[],
  bitValue: number,
  position: number
): string[] {
  return input.filter(el => {
    let arr = el.split("");
    return parseInt(arr[position]) === bitValue;
  });

}

function getRating(input: string[], position: number, commonality: Commonality): number {
  if (input.length === 1) {
    return asBaseTenNum(input[0]);
  }
  let bitValue = getMostOrLeastCommonBit(input, position, commonality);
  let matchingNums = getNumbersWithMatchingBitPosition(input, bitValue, position);
  return getRating(matchingNums, position + 1, commonality);
}

const o2 = getRating(input, 0, MOST);
const co2 = getRating(input, 0, LEAST);
const lifeSupportRating = o2 * co2; // 5736383
console.log(`Life Support Rating = ${lifeSupportRating}`);
