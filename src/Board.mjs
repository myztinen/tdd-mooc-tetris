export class Board {
  width;
  height;
  EMPTY = ".";
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
    this.fallingCellRow = 0;
    this.isFalling = true;

    if (this.fallingCellType.toString().length == 1) {
      this.fallingCellColumn = Math.floor(this.width / 2);
      this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;
    } else {
      this.stationary = this.board.map(function(arr) {return arr.slice();});
      this.fallingCellColumn = Math.floor(this.width/2)-Math.floor(block.columns() / 2)-1;
      for(let row = 0; row < block.rows(); row++) {
        for(let col = 0; col < block.columns(); col++) {
          this.board[row][this.fallingCellColumn+col ] = block.cellAt(row,col);
        }
      }
    }
  }

  tick() {
    if (typeof(this.fallingCellType) === "string") {
      if (this.fallingCellRow == (this.height-1) || this.board[this.fallingCellRow+1] [this.fallingCellColumn] != this.EMPTY) {
        this.isFalling = false;
        this.fallingCellType = undefined;
      } else{
        this.board[this.fallingCellRow] [this.fallingCellColumn] = this.EMPTY;
        this.fallingCellRow += 1;
        this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;

      } 
    } else {
      if (this.fallingBlockIsOnBottom() || this._checkCollisions('down')) {
        this.isFalling = false;
        this.fallingCellType = undefined;
        this.stationary = this.board.map(function(arr) {return arr.slice();});
      } else if(this.isFalling) {

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          for(let col = 0; col < this.fallingCellType.columns(); col++) {
            let cell = this.fallingCellType.cellAt(row,col);
            if (cell != '.') this.board[this.fallingCellRow+row][this.fallingCellColumn+col] = this.EMPTY;
          }
        }

        this.fallingCellRow++;

        for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
          for(let col = 0; col < this.fallingCellType.columns(); col++) {
            let cell = this.fallingCellType.cellAt(row,col);
            if (cell != '.') this.board[this.fallingCellRow+row][this.fallingCellColumn+col] = this.fallingCellType.cellAt(row,col);
          }
        }
      }
    }
  }

  _move(direction) {
    for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != '.') this.board[this.fallingCellRow+row][this.fallingCellColumn+col] = this.EMPTY;
      }
    }

    if(direction == 'left') { this.fallingCellColumn--;}
    else if (direction == 'right') { this.fallingCellColumn++;}
    else if (direction == 'down') { this.fallingCellRow++;}

    for(let row = 0; row < this.fallingCellType.rows() && (row+this.fallingCellRow) < this.height; row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != '.') this.board[this.fallingCellRow+row][this.fallingCellColumn+col] = this.fallingCellType.cellAt(row,col);
      }
    }
    console.log(this.toString());    
  }


  moveRight() {
    if(this.fallingCellColumn+this.fallingCellType.columns() < this.width && !this._checkCollisions('right'))this._move('right');
  }

  moveLeft() {
    if(this.fallingCellColumn > 0 && !this._checkCollisions('left')) this._move('left');
  }

  moveDown() {
    if(this.fallingBlockIsOnBottom() || this._checkCollisions('down')) {
      this.isFalling = false;
      this.fallingCellType = undefined;
      this.stationary = this.board.map(function(arr) {return arr.slice();});
    } else {
      this._move('down');
    }
  }

  fallingBlockIsOnBottom() {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != this.EMPTY) {
          if(this.fallingCellRow+row == this.height -1) return true;
        } 
      }
    }
    return false;
  }

  _checkCollisions(direction) {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != this.EMPTY) {
          if(direction == 'right') {
            if(this.stationary[this.fallingCellRow+row][this.fallingCellColumn+col+1] != this.EMPTY){ 
              return true;}
          } else if (direction == 'left') {
            if(this.stationary[this.fallingCellRow+row][this.fallingCellColumn+col-1] != this.EMPTY){ 
              return true;}
          } else if (direction == 'down') {
              if(this.stationary[this.fallingCellRow+row+1][this.fallingCellColumn+col] != this.EMPTY){ 
                return true;}
            }
        } 
      }
    }
    return false;
  }
  

  rowIsEmpty(rowIndex) {
    return this.board[rowIndex].every(element => element === this.EMPTY);
  }

  hasFalling() {
    return this.isFalling;
  }

}
