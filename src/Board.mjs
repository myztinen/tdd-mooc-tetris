export class Board {
  width;
  height;
  emptyCell = ".";
  filledCellRow;
  filledCellColumn;
  falling;
  board;


  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this._createEmptyBoard()
  }

  _createEmptyBoard() {
    return Array.from(Array(this.height), () => {
      return Array.from(Array(this.width), () => {
          return '.';
      });
    });
  }

  toString() {
    let boardString = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
          boardString  += this.board[row] [col];
      }
      boardString += "\n";
    }
  return boardString;    
  }

  drop() {
    if(this.falling == true) {
      throw new Error("already falling")
    }
    this.filledCellColumn = 1;
    this.filledCellRow = 0;
    this.falling = true;
  }

  tick() {
    if (this.filledCellRow == this.height) {
      this.falling = false;
    } else this.filledCellRow += 1;
  }

  hasFalling() {
    return this.falling;
  }

}
