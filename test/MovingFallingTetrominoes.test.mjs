
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("a Falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);

  });

  test("can be moved left", () => {
    board.tick();
    board.moveLeft()
    expect(board.toString()).to.equalShape(
      `..........
       ..TTT.....
       ...T......
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved right", () => {
    board.tick();
    board.moveLeft()
    board.tick();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...TTT....
       ....T.....
       ..........
       ..........`
    );
  });

  test("can be moved down", () => {
    board.tick();
    board.moveLeft()
    board.tick();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...TTT....
       ....T.....`
    );
  });


});

describe("a Falling tetromino in bottom", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
  });
  test("new one cannot be moved down throught other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.moveRight();
    board.moveDown();
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....TTT...
       .....T....
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "the block should stop moving").to.be.false;

  });

  test("new one cannot be moved left throught wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       TTT.......
       .T........
       ..........
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "the block should moving").to.be.true;
  });

  test("new one cannot be moved right throught wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       .......TTT
       ........T.
       ..........
       ...TTT....
       ....T.....`
    );
    expect(board.hasFalling(), "the block should moving").to.be.true;
  });

  test("new one cannot be moved right throught other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .TTT......
       ..TTTT....
       ....T.....`
    );
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .TTT......
       ..TTTT....
       ....T.....`
    );
    expect(board.hasFalling(), "the block should moving").to.be.true;
  });

  test("new one cannot be moved left throught other blocks", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....TTT..
       ...TTTT...
       ....T.....`
    );
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       .....TTT..
       ...TTTT...
       ....T.....`
    );
    expect(board.hasFalling(), "the block should moving").to.be.true;
  });


});