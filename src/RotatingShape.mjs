export class RotatingShape {

    static O_ROTATIONS = ["....\n.OO.\n.OO.\n....\n"]; 

    static I_ROTATIONS = [
      "....\nIIII\n....\n....\n",
      "..I.\n..I.\n..I.\n..I.\n"
      ];

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
        return this._rotate('right');
      }
    
      rotateLeft() {
        return this._rotate('left');
      }

      cellAt(row, col) {
        return this.shape[row] [col];
      }
      
      rowAt(row) {
        return this.shape[row];
      }

      _rotate(direction) {
        if (RotatingShape.O_ROTATIONS.indexOf(this.toString())>=0) {
          let newShape = this.shape.map(row => row.slice());
          for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
              if (direction === 'right') {
                //console.log("static version");
                let shape = RotatingShape.O_ROTATIONS;
                return new RotatingShape(shape[0]);
                
              } else if (direction === 'left') {
                newShape[this.height - 1 - col][row] = this.shape[row][col];
              }
            }
          }
          return new RotatingShape(newShape.map(subArray => subArray.join(' ')).join('\n'));
        } else {
          let newShape = this.shape.map(row => row.slice());
          for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
              if (direction === 'right') {
                newShape[col][this.width - 1 - row] = this.shape[row][col];
              } else if (direction === 'left') {
                newShape[this.height - 1 - col][row] = this.shape[row][col];
              }
            }
          }
          return new RotatingShape(newShape.map(subArray => subArray.join(' ')).join('\n'));
        }
      }

      _stringToArray(input) {
        const clearinput = input.replace(/[\t\r\f ]+/g, '');
        const lines = clearinput.split('\n');
        const twoDArray = lines.map(line => line.split(''));
        return twoDArray;
      }
      

}