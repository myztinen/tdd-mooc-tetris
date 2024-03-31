
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Board with two I tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    dropTwoHorizontalIBars(board);
  });

  test("line is cleared after a tick", () => {
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

  });

  test("two lines are cleared after a tick", () => {
    dropTwoHorizontalIBars(board);
    dropOTetrominoeToLeftBottom(board);
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       OOIIIIIIII
       OOIIIIIIII`
    );
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ..........
       ..........`
    );

  });
});

describe("Board with two T and one O tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    dropTBars(board);
    dropOTetrominoeToLeftBottom(board);
    board.tick();
  });
  test("two lines are cleared after a tick", () => {
    expect(board.toString()).to.equalShape(
     `..........
      ..........
      ..........
      ..........
      OO..TTTTTT
      OO...T..T.`
    );
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    fallToBottom(board);
    expect(board.toString()).to.equalShape(
    `..........
      ..........
      ..........
      ..........
      ..........
      OOOO.T..T.`
    );
  });
});

  describe("Board with four T and one O tetrominoes", () => {
    let board;
    beforeEach(() => {
      board = new Board(10, 6);
      dropTBars(board);
      dropTBars(board);
      dropOTetrominoeToLeftBottom(board);
      board.tick();
    });
    test("two lines are cleared after a tick", () => {
      expect(board.toString()).to.equalShape(
       `..........
        ..........
        ....TTTTTT
        .....T..T.
        OO..TTTTTT
        OO...T..T.`
      );
      board.drop(Tetromino.O_SHAPE);
      board.moveLeft();
      board.moveLeft();
      fallToBottom(board);
      expect(board.toString()).to.equalShape(
       `..........
        ..........
        ..........
        ....TTTTTT
        .....T..T.
        OOOO.T..T.`
      );
    });
});




function dropOTetrominoeToLeftBottom(board) {
  board.drop(Tetromino.O_SHAPE);
  board.moveLeft();
  board.moveLeft();
  board.moveLeft();
  board.moveLeft();
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

function dropTBars(board) {
  board.drop(Tetromino.T_SHAPE);
  board.tick();
  board.moveRight();
  board.moveRight();
  board.moveRight();
  board.moveRight();
  fallToBottom(board);
  board.drop(Tetromino.T_SHAPE);
  board.moveRight();
  fallToBottom(board);
}


