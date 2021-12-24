import Parser from "./parser";
import { Cell } from "./interfaces";
import Board from "./board";

const numbers = Parser.getCalledNumbers();
const boards = Parser.getBoards(); 

function runGame() {
  let winCount = 0;

  for (let number of numbers) {
    for (let board of boards) {

      if (board.won) {
        continue;
      }

      callNumber(board, number);

      if (!board.hasWon()) {
        continue;
      }

      winCount++;
      board.handleWin(number, winCount);
    }
  }
}

function firstToWin(boards: Board[]): Board {
  return boards.find(b => b.winOrder === 1);
}

function lastToWin(boards: Board[]): Board {
  return boards.find(b => b.winOrder === boards.length);
}

function callNumber(board: Board, n: number) {
  board.cells.forEach(cell => {
    if (cell.number === n) {
      cell.called = true;
    }
  });
}

runGame();
const firstBoard = firstToWin(boards);
console.log(firstBoard.score === 21607)
const lastBoard = lastToWin(boards);
console.log(lastBoard.score === 19012)
