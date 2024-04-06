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
    this.shuffleMixingBag();
    }

  getTetromino() {
    if (this.mixingBag.length == 0) {
      this.mixingBag = [...this.tetrominoes];
      this.shuffleMixingBag();
    }
    return this.mixingBag.pop();
  }

  shuffleMixingBag() {
    for (let i = this.mixingBag.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.mixingBag[i], this.mixingBag[j]] = [this.mixingBag[j], this.mixingBag[i]];
    }
  }
}