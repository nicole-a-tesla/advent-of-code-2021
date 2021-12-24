import getInputString from "../fetchInputString";
import Grid from "./grid";
import LineSegment from "./lineSegment";

const inputString: string = getInputString("5/input.txt");
const lineSegmentsDirty: string[] = inputString.split(/\r?\n/);
const lineSegments: LineSegment[] = lineSegmentsDirty
  .filter(coordStr => coordStr !== '')
  .map(coordStr => new LineSegment(coordStr));

const plotDiagonal = (ls: LineSegment, grid: Grid): void => {
  const [hiX, lowX] = ls.getHiLoXs();
  const [_, lowY] = ls.getHiLoYs();

  const segmentLength = ls.length();

  for (let i = 0; i < segmentLength; i++) {
    const xVal = ls.slopeIsPositive() ? lowX + i : hiX - i;
    grid.increment(xVal, lowY + i);
  }
}

const plotLineSegment = (lineSeg: LineSegment, grid: Grid, includeDiag: boolean): void => {
  if (lineSeg.isDiagonal()) {
    if (!includeDiag) {
      return;
    }
    return plotDiagonal(lineSeg, grid);
  }

  const [hi, low] = lineSeg.getEdgesOfNonSharedCoord();

  for (let i = low; i <= hi; i++) {
    lineSeg.hasSharedX()
      ? grid.increment(lineSeg.x1, i)
      : grid.increment(i, lineSeg.y1);
  }
}

// Part 1: exclude diagonals
const grid1 = new Grid(inputString);
lineSegments.forEach(ls => plotLineSegment(ls, grid1, false));
const part1Answer = grid1.countGreaterThan1s(); // 6311
console.log(part1Answer);

// Part 2: include diagonals
const grid2 = new Grid(inputString);
lineSegments.forEach(ls => plotLineSegment(ls, grid2, true));
const part2Answer = grid2.countGreaterThan1s(); // 19929
console.log(part2Answer);
