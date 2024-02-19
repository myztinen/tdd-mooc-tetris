export class Board {
  width;
  height;
  emptyCell = ".";
  filledCellRow;
  filledCellColumn;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let boardString = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        if (this.filledCellColumn == col && this.filledCellRow == row) {
          boardString  += 'X';
      } else 
      boardString += this.emptyCell;
      }
      boardString += "\n";
    }
  return boardString;    
  }

  drop() {
    this.filledCellColumn = 1;
    this.filledCellRow = 0;
  }

  tick() {
    this.filledCellRow += 1;
  }

}
