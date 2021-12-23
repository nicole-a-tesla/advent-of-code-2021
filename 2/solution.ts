import getInputString from "../fetchInputString";
const inputString: string = getInputString("2/input.txt");
const inputArray: string[] = inputString.split(/\r?\n/);

interface Location {
  depth: number;
  horizontal_position: number;
  aim: number;
}

interface Move {
  direction: string;
  amount: number;
}

function parseInput(inputArray: string[]): Move[] {
  return inputArray.map((input) => {
    let [dir, amt] = input.split(" ");
    return {
      direction: dir,
      amount: parseInt(amt),
    }
  })
}

function calculatePosition(directions: Move[]): Location {
  let location: Location = {depth: 0, horizontal_position: 0, aim: 0};

  for (let m of directions) {
    location = updatePosition(location, m);
  }
  return location;
}

function updatePosition(location: Location, move: Move): Location {
  switch(move.direction) {
    case "forward":
      location.horizontal_position += move.amount;
      location.depth += location.aim * move.amount;
      break;
    case "up":
      location.aim -= move.amount;
      break;
    case "down":
      location.aim += move.amount;
      break;
    default:
      break;
  }
  return location;
}

const directions = parseInput(inputArray);
const finalPosition = calculatePosition(directions);
const solution = finalPosition.depth * finalPosition.horizontal_position;
console.log(finalPosition);
console.log(solution);

// Part One
// finalPosition = { depth: 998, horizontal_position: 1993 }
// solution = depth * horizontal_position = 1989014

// Part Two
// finalPosition = { depth: 1006983, horizontal_position: 1993, aim: 998 }
// solution = depth * horizontal_position = 2006917119
