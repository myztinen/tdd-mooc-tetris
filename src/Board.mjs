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
      this.fallingCellRow = 0;
      for(let row = 0; row < block.rows(); row++) {
        for(let col = 0; col < block.columns(); col++) {
          this.board[row][Math.floor(this.width/2)-Math.floor(block.columns() / 2)-1+col ] = block.cellAt(row,col);
        }
      }
    }
    this.isFalling = true;
  }

  tick() {
    if (typeof(this.fallingCellType) === "string") {
      // Bottom reached or another block
      if (this.fallingCellRow == (this.height-1) || this.board[this.fallingCellRow+1] [this.fallingCellColumn] != '.') {
        this.isFalling = false;
        this.fallingCellType = undefined;
      } else{
        this.board[this.fallingCellRow] [this.fallingCellColumn] = '.'
        this.fallingCellRow += 1;
        this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;

      } 
    } else {
      if (!this.rowIsEmpty(this.height-1)) {
        this.isFalling = false;
        this.fallingCellType = undefined;
      } else  {
/*         console.log(this.toString());
        console.log(this.fallingCellRow);
        console.log(this.fallingCellType.rows()); */

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          this.board[row+this.fallingCellRow] = new Array(this.width).fill('.');
        }

        this.fallingCellRow++;

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          for(let col = 0; col < this.fallingCellType.columns(); col++) {
            this.board[this.fallingCellRow+row][Math.floor(this.width/2)-Math.floor(this.fallingCellType.columns() / 2)-1+col ] = this.fallingCellType.cellAt(row,col);
          }
        }
        console.log(this.toString());
      }
    }
  }

  rowIsEmpty(rowIndex) {
    return this.board[rowIndex].every(element => element === '.');
  }

  hasFalling() {
    return this.isFalling;
  }

}
