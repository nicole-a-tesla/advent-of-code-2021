import Parser from "./parser";
import {Cell, Board} from "./interfaces";

const numbers = Parser.getCalledNumbers();
const boards = Parser.getBoards(); 

function isTargetWin(board: Board, boards: Board[], returnFirstWin: boolean): boolean {
  return returnFirstWin || isLastWin(board, boards);
}

function runGame(returnFirstWin = true) {
  for (let number of numbers) {
    for (let board of boards) {

      if (board.won) {
        continue;
      }

      callNumber(board, number);
      const hasWon = checkBoardForWin(board);

      if (!hasWon) {
        continue;
      }

      board.won = true;
      const shouldScore = isTargetWin(board, boards, returnFirstWin);

      if (shouldScore) {
        return scoreBoard(board, number);
      }

    }
  }
}

function isLastWin(board: Board, boards: Board[]): boolean {
  const won = boards.filter(b => b.won);
  return won.length === boards.length;
}

function scoreBoard(board: Board, winningNumber: number): number {
  const unmarkedCells = board.cells.filter(cell => cell.called === false);
  const unmarkedSum = unmarkedCells.reduce((prev, next) => {
    return {
      x: 0,
      y: 0,
      called: false,
      number: prev.number + next.number
    }
  })
  return unmarkedSum.number * winningNumber;
}

function callNumber(board: Board, n: number) {
  board.cells.forEach(cell => {
    if (cell.number === n) {
      cell.called = true;
    }
  });
}

function checkBoardForWin(board: Board): boolean {
  for (let i = 0; i <= 4; i++) {
    const col = getColumn(board, i);
    if (allAreCalled(col)) {
      return true;
    }
    const row = getRow(board, i);
    if (allAreCalled(row)) {
      return true;
    }
  }
  return false;
}

function allAreCalled(cells: Cell[]): boolean {
    const called = cells.filter(cell => cell.called === true);
    return cells.length === called.length;
}

function getColumn(board: Board, x: number): Cell[] {
  return board.cells.filter(cell => {
    return cell.x === x;
  });
}

function getRow(board: Board, y: number): Cell[] {
  return board.cells.filter(cell => {
    return cell.y === y;
  });
}

const firstWinningBoardScore = runGame(); // 21607
const lastWinningBoardScore = runGame(false); // 19012
