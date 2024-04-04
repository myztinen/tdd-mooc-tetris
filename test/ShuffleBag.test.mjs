
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/TetrominoShuffleBag.mjs";

describe("Tetromino shuffle bag", () => {
  let shuffleBag;

  beforeEach(() => {
    shuffleBag = new ShuffleBag();
  });
  test("can be initialized", () => {
    expect(shuffleBag.getTetromino().constructor.name).to.equal('Tetromino');
  });
});

