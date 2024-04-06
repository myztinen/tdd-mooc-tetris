
import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";
import { ShuffleBag } from "../src/TetrominoShuffleBag.mjs";

describe("Tetromino shuffle bag", () => {
  let shuffleBag;
  let tetrominoNames = ['O', 'I', 'T', 'J', 'L', 'S', 'Z']

  beforeEach(() => {
    shuffleBag = new ShuffleBag();
  });

  test("can be initialized", () => {
    expect(shuffleBag.getTetromino().constructor.name).to.equal('Tetromino');
    expect(tetrominoNames).to.contain(shuffleBag.getTetromino().name);

  });

  test("bag containts 7 distinct tetrominoes", () => {
    let tetrominoes = [];
    for( let i=0; i<7; i++) {
      tetrominoes.push(shuffleBag.getTetromino());
    }
    tetrominoNames.forEach(letter => 
      expect(tetrominoes.some(tetromino => tetromino.name == letter)).to.be.true
    )

  });
  
  test("New tetrominoes are receved after bag is empty", () => {
    let tetrominoLetters = [];
    for( let i=0; i<7; i++) {
      tetrominoLetters.push(shuffleBag.getTetromino().name);
    }
    let existingTetromino = shuffleBag.getTetromino();
    expect(tetrominoLetters.some(letter => existingTetromino.name == letter)).to.be.true;
    

  });


});

