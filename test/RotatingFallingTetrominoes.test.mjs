
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
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `....T.....
       ....TT....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.tick()
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `....T.....
       ...TT.....
       ....T.....
       ..........
       ..........
       ..........`
    );
  });

  test("can be rotated twice", () => {
    board.tick();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
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
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  test("can be rotated right", () => {
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.....I....
       .....I....
       .....I....
       .....I....
       ..........
       ..........`
    );
  });

  test("can be rotated twice", () => {
    board.tick();
    board.rotateRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ...IIII...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved along right border", () => {
    board.tick();
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
    board.tick();
    board.rotateRight();
    board.moveLeft();
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
    board.tick();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
  });

  test("can be moved along right border", () => {
    board.rotateRight();
    expect(board.toString()).to.equalShape(
     `..........
      ......IIII
      ..........
      ..........
      ..........
      ..........`
    );
  });

  test("kick", () => {
    board.moveLeft();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
      ......IIII
      ..........
      ..........
      ..........
      ..........`
    );
  });
});

describe("I tetromino moved to left side ", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
  });


  test("is on left side", () => {
      expect(board.toString()).to.equalShape(
      `I.........
       I.........
       I.........
       I.........
       ..........
       ..........`
      );
    });

  test("Cannot be rotated when close to border", () => {
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
    `I.........
     I.........
     I.........
     I.........
     ..........
     ..........`
    );
  });

  test("Can be rotated when not attached to border", () => {
    board.moveRight();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
   `..........
    IIII......
    ..........
    ..........
    ..........
    ..........`
    );
  });
});


describe("With two I block in bottom ", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.I_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.I_SHAPE);
    fallToBottom(board);
  });


  test("tetrominos are on left bottom", () => {
      expect(board.hasFalling(), "the block should stop moving").to.be.false;
      expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ...IIII...
       ...IIII...`
      );
    });

  test("Kick works from dropped tetrominos", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      ..........
      ........T.
      ...IIIITT.
      ...IIII.T.`
    );
  });

  test("Can not be rotated when there are no space", () => {
    board.drop(Tetromino.I_SHAPE);
    board.tick();
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
     `..........
      ..........
      .I........
      .I........
      .I.IIII...
      .I.IIII...`
       );
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
      ..........
      .I........
      .I........
      .I.IIII...
      .I.IIII...`
    );
  });
});



