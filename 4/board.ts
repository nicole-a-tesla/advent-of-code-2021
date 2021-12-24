import { Cell } from "./interfaces";

export default class Board {
  cells: Cell[];
  won: boolean;
  winOrder: number;
  score: number;
  width: number;

  constructor(cells: Cell[]) {
    this.cells = cells;
    this.won = false;
    this.winOrder = 0;
    this.score = 0;
    this.width = this.findWidth();
  }

  hasWon(): boolean {
    for (let i = 0; i <= this.width; i++) {
      const col = this.getColumn(i);
      if (this.allAreCalled(col)) {
        return true;
      }
      const row = this.getRow(i);
      if (this.allAreCalled(row)) {
        return true;
      }
    }
    return false;
  }

  handleWin(winningNumber: number, winOrder: number): void {
    this.won = true;
    this.winOrder = winOrder;
    this.calculateScore(winningNumber);
  }

  calculateScore(winningNumber: number): number {
    const unmarkedCells = this.cells.filter(cell => cell.called === false);
    const unmarkedSum = unmarkedCells.reduce((prev, next) => {
      return {
        x: 0,
        y: 0,
        called: false,
        number: prev.number + next.number
      }
    })
    this.score = unmarkedSum.number * winningNumber;
    return this.score;
  }

  allAreCalled(cells: Cell[]): boolean {
    return cells.every(cell => cell.called);
  }

  getColumn(x: number): Cell[] {
    return this.cells.filter(cell => {
      return cell.x === x;
    });
  }

  getRow(y: number): Cell[] {
    return this.cells.filter(cell => {
      return cell.y === y;
    });
  }

  findWidth(): number {
    return Math.max.apply(Math, this.cells.map(function(cell) { return cell.x; }))
  }
}
