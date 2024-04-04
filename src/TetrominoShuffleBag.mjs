import { Tetromino } from "./Tetromino.mjs";

export class ShuffleBag {

  tetrominoes = [  Tetromino.O_SHAPE,
                   Tetromino.I_SHAPE,
                   Tetromino.J_SHAPE,
                   Tetromino.L_SHAPE,
                   Tetromino.S_SHAPE,
                   Tetromino.T_SHAPE,
                   Tetromino.Z_SHAPE]
  mixingBag = [...this.tetrominoes];

  constructor() {
    }

  getTetromino() {
    return this.mixingBag[0];
  }
}