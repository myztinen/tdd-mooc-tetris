export class RotatingShape {
    shape;
    height;
    width;
    constructor(shape) {
        this.shape = this._stringToArray(shape);
        this.height = this.shape.length;
        this.width = this.shape[0].length;
      }

      toString() {
        let boardString = "";
        for (let row = 0; row < this.height; row++) {
          for (let col = 0; col < this.width; col++) {
              boardString  += this.shape[row] [col];
          }
          boardString += "\n";
        }
        return boardString;    
      }

      rotateRight() {
        return this;
      }

      rotateLeft() {
        return this;
      }

      _stringToArray(input) {
        const clearinput = input.replace(/[\t\r\f ]+/g, '');
        const lines = clearinput.split('\n');
        const twoDArray = lines.map(line => line.split(''));
        return twoDArray;
      }

}