
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ScoringSystem } from "../src/ScoringSystem.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Scoring system", () => {
  let board;
  let scores
  beforeEach(() => {
    board = new Board(10, 6);
    scores = new ScoringSystem(0);
    board.addListener(scores);

  });

  test("can be initialized", () => {
    expect(scores.getScore()).to.equal(0);

  });

  test("line is cleared after a tick", () => {
    dropTwoHorizontalIBars(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       OO........
       OOIIIIIIII`
    );
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       OO........`
    );
    expect(scores.getScore()).to.equal(40);
  });
});

function dropTwoHorizontalIBars(board) {
  board.drop(Tetromino.I_SHAPE);
  board.moveRight();
  board.moveRight();
  board.moveRight();
  fallToBottom(board);
  board.drop(Tetromino.I_SHAPE);
  board.moveLeft();
  fallToBottom(board);
}

