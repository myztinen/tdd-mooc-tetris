
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("a Falling T tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  test("can be rotated to left", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated twice", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ...TTT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });
});

describe("a Falling I tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
  });

  test("can be rotated to left", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....I.....
       ....I.....
       ....I.....
       ....I.....
       ..........
       ..........`
    );
  });

  test("can be rotated twice", () => {
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..IIII....
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved along right border", () => {
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
    );
  });

  test("can be moved along left border", () => {
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `I.........
       I.........
       I.........
       I.........
       ..........
       ..........`
    );
  });

});

describe("I tetromino on right side ", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
  });

  test.skip("can be moved along right border", () => {

    board.rotateRight();

    expect(board.toString()).to.equalShape(
      `.........I
       .........I
       .........I
       .........I
       ..........
       ..........`
    );
  });

  test.skip("can be moved along left border", () => {
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `I.........
       I.........
       I.........
       I.........
       ..........
       ..........`
    );
  });

});
