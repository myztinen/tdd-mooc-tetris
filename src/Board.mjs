export class Board {
  width;
  height;
  emptyCell = ".";
  fallingCellRow;
  fallingCellColumn;
  fallingCellType;
  isFalling;
  board;
  stationary;


  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = this._createEmptyBoard()
    this.stationary = this._createEmptyBoard();
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

  toStationaryString() {
    let boardString = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
          boardString  += this.stationary[row] [col];
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
      this.stationary = this.board.map(function(arr) {return arr.slice();});
      this.fallingCellRow = 0;
      this.fallingCellColumn = Math.floor(this.width/2)-Math.floor(block.columns() / 2)-1;
      for(let row = 0; row < block.rows(); row++) {
        for(let col = 0; col < block.columns(); col++) {
          this.board[row][this.fallingCellColumn+col ] = block.cellAt(row,col);
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
      if (this.fallingBlockIsOnBottom() || this.fallingBlockHitsAnotherBlock()) {
        this.isFalling = false;
        this.fallingCellType = undefined;
      } else if(this.isFalling) {

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          for(let col = 0; col < this.fallingCellType.columns(); col++) {
            let cell = this.fallingCellType.cellAt(row,col);
            if (cell != '.') this.board[this.fallingCellRow+row][this.fallingCellColumn+col ] = '.';
            
          // tyhjennnä alue jos block sillä rivillä ei ole tyhjä
          }
        }

        this.fallingCellRow++;

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          for(let col = 0; col < this.fallingCellType.columns(); col++) {
            let cell = this.fallingCellType.cellAt(row,col);
            if (cell != '.') this.board[this.fallingCellRow+row][Math.floor(this.width/2)-Math.floor(this.fallingCellType.columns() / 2)-1+col ] = this.fallingCellType.cellAt(row,col);
          }
        }
      }
    }
  }
  fallingBlockIsOnBottom() {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != '.') {
          if(this.fallingCellRow+row == this.height -1) return true;
        } 
      }
    }
    return false;
  }

  fallingBlockHitsAnotherBlock() {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != '.') {
          
          if(this.stationary[this.fallingCellRow+row+1][this.fallingCellColumn+col] != '.'){ 
            return true;}
        } 
      }
    }
    return false;
  }
  

  rowIsEmpty(rowIndex) {
    return this.board[rowIndex].every(element => element === '.');
  }

  hasFalling() {
    return this.isFalling;
  }

}
