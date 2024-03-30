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
    this.isFalling = true;

    if (this.fallingCellType.toString().length == 1) {
      this.fallingCellRow = 0;
      this.fallingCellColumn = Math.floor(this.width / 2);
      this.board[this.fallingCellRow] [this.fallingCellColumn] = this.fallingCellType;
    } else {
      this.fallingCellRow = -1;
      this.stationary = this.board.map(function(arr) {return arr.slice();});
      this.fallingCellColumn = Math.floor(this.width/2)-Math.floor(block.columns() / 2);
      this._drawNewTetromino();
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
        this.stationary = this.board.map(function(arr) {return arr.slice();});
      } else if(this.isFalling) {
        this._clearOldTetromino();
        this.fallingCellRow++;
        this._drawNewTetromino();

      }
    }
  }

  rotateLeft() {
    this._rotateTetromino('left'); 
  }

  rotateRight() {
    this._rotateTetromino('right');
  }

  _rotateTetromino(direction) {
    this._clearOldTetromino();
    let temp = this.fallingCellType;
    if(direction == 'right') this.fallingCellType = this.fallingCellType.rotateRight();
    if(direction == 'left') this.fallingCellType = this.fallingCellType.rotateLeft();

    if (!this._fallingBlockIsOnBoard() || this._IsOverlappingStationaryBlock()) {
      this.fallingCellColumn++;
    }
    if (!this._fallingBlockIsOnBoard() || this._IsOverlappingStationaryBlock()) {
      this.fallingCellColumn -= 2;
    }
    if (!this._fallingBlockIsOnBoard() || this._IsOverlappingStationaryBlock()) {
      this.fallingCellColumn++;
      this.fallingCellType = temp;
    }
    this._drawNewTetromino();
  }

  _drawNewTetromino() {
    for (let row = 0; row < this.fallingCellType.rows() && (row + this.fallingCellRow) < this.height; row++) {
      for (let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row, col);
        if (cell != this.EMPTY) this.board[this.fallingCellRow + row][this.fallingCellColumn + col] = this.fallingCellType.cellAt(row, col);
      }
    }
  }

  _clearOldTetromino() {
    for (let row = 0; row < this.fallingCellType.rows() && (row + this.fallingCellRow) < this.height; row++) {
      for (let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row, col);
        if (cell != this.EMPTY) this.board[this.fallingCellRow + row][this.fallingCellColumn + col] = this.EMPTY;
      }
    }
  }

  _move(direction) {
    if(this.hasFalling()) {
      this._clearOldTetromino();
      if(direction == 'left') { this.fallingCellColumn--;}
      else if (direction == 'right') { this.fallingCellColumn++;}
      else if (direction == 'down') { this.fallingCellRow++;}
      this._drawNewTetromino();
    }
  }


  moveRight() {
    if(this._blockCanBeMovedTo('right') && !this._checkCollisions('right'))this._move('right');
  }

  moveLeft() {
    if(this._blockCanBeMovedTo('left') && !this._checkCollisions('left')) this._move('left');
  }

  moveDown() {
    if(this.fallingBlockIsOnBottom() || this._checkCollisions('down')) {
      this.isFalling = false;
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
          if(this.fallingCellRow+row == this.height -1)  return true;
          
        } 
      }
    }
    return false;
  }

  _blockCanBeMovedTo(direction) {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != this.EMPTY) {
          if(direction == 'right'){
            if(this.fallingCellColumn+col+1 > this.width -1) return false;
          } 
          else if(direction == 'left'){
             if(this.fallingCellColumn+col-1 < 0) return false;
          } 
          else if(direction == 'down'){
            if (this.fallingCellRow+row+1 > this.height-1) return false;
          } 
        } 
      }
    }
    return true;
  }

  _fallingBlockIsOnBoard() {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != this.EMPTY) {
          if(this.fallingCellColumn+col > this.width-1 || this.fallingCellColumn < 0) return false;
          else if (this.fallingCellRow+row > this.height-1 || this.fallingCellRow < 0 ) return false;
        } 
      }
    }
    return true;
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
            if(this._containsDroppedBlock(this.fallingCellRow+row, this.fallingCellColumn+col+1)){ 
              return true;}
          } else if (direction == 'left') {
            if(this._containsDroppedBlock(this.fallingCellRow+row, this.fallingCellColumn+col-1)){ 
              return true;}
          } else if (direction == 'down') {
              if(this._containsDroppedBlock(this.fallingCellRow+row+1, this.fallingCellColumn+col)){ 
                return true;}
            }
        } 
      }
    }
    return false;
  }

  _IsOverlappingStationaryBlock() {
    if (!this.isFalling) {
      return false;
    }
    for(let row = 0; row < this.fallingCellType.rows(); row++) {
      for(let col = 0; col < this.fallingCellType.columns(); col++) {
        let cell = this.fallingCellType.cellAt(row,col);
        if (cell != this.EMPTY) {
            if(this._containsDroppedBlock(this.fallingCellRow+row, this.fallingCellColumn+col)) return true;
        } 
      }
    }
    return false;
  }
  
  hasFalling() {
    return this.isFalling;
  }

  _containsDroppedBlock(row, col) {
    return this.stationary[row][col] != this.EMPTY;
  }

  clearLines() {
    let fullRows = [];
    this.stationary.forEach((row, rowIndex) => {
      let fullRow = row.some(item => item == this.EMPTY);
      if(!fullRow) {
        fullRows.push(rowIndex);
      } 
    });
    return fullRows;
  }
}
