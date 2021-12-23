import getInputString from "../fetchInputString";
import {Cell, Board} from "./interfaces";

const inputString: string = getInputString("4/input.txt");
const inputArray: string[] = inputString.split(/\n\s*\n/g);

const Parser = {
  getCalledNumbers(): number[] {
    return inputArray[0].split(",").map(n => parseInt(n));
  },

  getBoards(): Board[] {
    const boardsStrings = inputArray.slice(1);
    return boardsStrings.map(boardString => this.parseBoard(boardString));
  },

  rowToCellsStrings(row: string): string[] {
    const cellStrings = row.split(" ");
    return cellStrings.filter(el => el !== '');
  },

  parseBoard(inputString: string): Board {
    const rows = inputString.split(/\r?\n/);
    const cells: Cell[] = [];
    rows.forEach((row, x) => {
      const cellStrings = this.rowToCellsStrings(row); 
      cellStrings.forEach((cellString, y) => {
        cells.push(
          this.parseCell(cellString, x, y)
        );
      });
    });

    return {
      cells: cells,
      won: false,
    }
  },

  parseCell(cellString: string, x: number, y: number): Cell {
    return {
      x: x,
      y: y,
      number: parseInt(cellString),
      called: false,
    };
  }
}

export default Parser;
