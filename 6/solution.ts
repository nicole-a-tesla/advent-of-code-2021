import getInputString from "../fetchInputString";
const inputString: string = getInputString("6/input.txt");
const inputArray: number[] = inputString.split(",").map(i => parseInt(i));

// Original slow solution
class Fish {
  clock: number;

  constructor(daysOld: number = 8) {
    this.clock = daysOld;
  }

  incrementDay() {
    if (this.clock === 0) {
      this.clock = 6;
      return new Fish();
    }
    this.clock--;
  }
}

function getFishCount(dayCount: number): number {
  const school: Fish[] = inputArray.map(daysOld => new Fish(daysOld));

  let day = 1;

  while (day <= dayCount) {
    school.forEach(fish => {
      const newFishMaybe = fish.incrementDay();
      if (newFishMaybe) {
        school.push(newFishMaybe);
      }
    });
    day++
  }
  return school.length;
}

// Part 1: after 80 days
const after80Days = getFishCount(80);
console.log(`After 80 days, there are ${after80Days} fish`);

// Part 2: after 256 days

function getFastFishCount(dayCount: number): number {
  const counts = Array(9).fill(0);
  inputArray.forEach(fishAge => counts[fishAge]++)

  for (let day = 0; day < dayCount; day++) {
    const zeroDayFishCount = counts.shift();

    // each day 0 fish resets to a day 6 fish
    counts[6] += zeroDayFishCount;

    // each zero day fish creates a new day 8 fish
    counts.push(zeroDayFishCount);
  }

  return counts.reduce((last, next) => last + next);
}

const after256Days = getFastFishCount(256);
console.log(`After 256 days, there are ${after256Days} fish`);
