export class Board {
  width;
  height;
  emptyCell = ".";

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let boardString = "";
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
              boardString += this.emptyCell;
      }
      boardString += "\n";
    }
  return boardString;    
  }


}
