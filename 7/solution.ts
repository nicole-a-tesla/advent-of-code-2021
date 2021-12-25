import getInputString from "../fetchInputString";
const inputString: string = getInputString("7/input.txt");
const crabPositions: number[] = inputString.split(",").map(i => parseInt(i));

class CrabCalculator {
  positionToCost: Object;

  constructor() {
    this.positionToCost = this.getPositionToCostMap()
  }

  getPositionToCostMap(): Object {
    const positionToCost = {}
    const maxPosition = Math.max(...crabPositions);
    const allPositions = Array.from(Array(maxPosition + 1).keys()) ;
    allPositions.forEach(position => positionToCost[position] = 0);
    return positionToCost;
  }

  getLowestCost(): number {
    const costs: number[] = Object.values(this.positionToCost);
    return Math.min(...costs);
  }
}

class PartOne extends CrabCalculator {
  getCostOfPositionT(t: number): number {
    let cost = 0;
    crabPositions.forEach(position => {
      cost += (Math.abs(t - position))
    });
    return cost;
  }

  calculateAllPositionCosts(): void {
    Object.keys(this.positionToCost).forEach(position => {
      this.positionToCost[position] += this.getCostOfPositionT(parseInt(position));
    })
  }
}

const partOne = new PartOne();
partOne.calculateAllPositionCosts();
const partOneMinCost = partOne.getLowestCost();
console.log(`lowest fuel cost for part one is ${partOneMinCost}`);
console.log(partOneMinCost === 359648 ? 'CORRECT' : 'INCORRECT');

class PartTwo extends CrabCalculator {
  getCostOfPositionT(t: number): number {
    let cost = 0;
    crabPositions.forEach(position => {
      const distance = Math.abs(t - position);
      cost += (distance + Math.pow(distance, 2)) / 2;
    });
    return cost;
  }

  calculateAllPositionCosts(): void {
    Object.keys(this.positionToCost).forEach(position => {
      this.positionToCost[position] += this.getCostOfPositionT(parseInt(position));
    })
  }
}

const partTwo = new PartTwo();
partTwo.calculateAllPositionCosts();
const partTwoMinCost = partTwo.getLowestCost();
console.log(`lowest fuel cost for part two is ${partTwoMinCost}`);
console.log(partTwoMinCost === 100727924 ? 'CORRECT' : 'INCORRECT');
