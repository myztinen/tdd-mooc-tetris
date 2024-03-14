export class Board {
  width;
  height;
  emptyCell = ".";
  fallingCellRow;
  fallingCellColumn;
  fallingCellType;
  isFalling;
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

  drop(block) {
    if(this.isFalling == true) {
      throw new Error("already falling")
    }
    this.fallingCellType = block;
    if (block.toString().length == 1) {
      this.fallingCellColumn = Math.floor(this.width / 2);
      this.fallingCellRow = 0;
      this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;
    } else {
      for(let row = 0; row < block.rows(); row++) {
        for(let col = 0; col < block.columns(); col++) {
          console.log(Math.floor(this.height/2)-block.rows());
          this.board[row][Math.floor(this.width/2)-Math.floor(block.columns() / 2)-1+col ] = block.cellAt(row,col);
        }
      }
    }
    this.isFalling = true;
  }

  tick() {
    if (this.fallingCellRow == (this.height-1) || this.board[this.fallingCellRow+1] [this.fallingCellColumn] != '.') {
      this.isFalling = false;
      this.fallingCellType = undefined;
    } else{
      this.board[this.fallingCellRow] [this.fallingCellColumn] = '.'
      this.fallingCellRow += 1;
      this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;

    } 
  }

  hasFalling() {
    return this.isFalling;
  }

}
