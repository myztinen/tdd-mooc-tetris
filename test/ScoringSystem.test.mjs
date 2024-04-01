
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
  let scores;
  let otherScores;
  beforeEach(() => {
    board = new Board(10, 6);
    scores = new ScoringSystem(0);
    otherScores = new ScoringSystem(2);
    board.addListener(scores);

  });

  test("can be initialized", () => {
    expect(scores.getScore()).to.equal(0);

  });

  test("Scores can be updated", () => {
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

  test("Score system can be removed", () => {
    board.removeListener(scores);
    createScoringEvent(board);
    expect(scores.getScore()).to.equal(0);
  });

  test("Can have two scoring systems", () => {
    board.addListener(otherScores);
    createScoringEvent(board);
    expect(scores.getScore()).to.equal(40);
    expect(otherScores.getScore()).to.equal(120);
  });
});

function createScoringEvent(board) {
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
  board.tick();
}

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

