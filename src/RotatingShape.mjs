export class RotatingShape {

    static O_ROTATIONS = ["....\n.OO.\n.OO.\n....\n"]; 

    static I_ROTATIONS = [
      "....\nIIII\n....\n....\n",
      "..I.\n..I.\n..I.\n..I.\n"
      ];

    static T_ROTATIONS = [
       "....\nTTT.\n.T..\n....\n",
       ".T..\nTT..\n.T..\n....\n",
        "....\n.T..\nTTT.\n....\n",
        ".T..\n.TT.\n.T..\n....\n",
      ];
    
    static J_ROTATIONS = [
      "....\nJJJ.\n..J.\n....\n",
      ".J..\n.J..\nJJ..\n....\n",
      "....\nJ...\nJJJ.\n....\n",
      ".JJ.\n.J..\n.J..\n....\n"
    ];
    
    static L_ROTATIONS = [
      "....\nLLL.\nL...\n....\n",
      "LL..\n.L..\n.L..\n....\n",
      "....\n..L.\nLLL.\n....\n",
      ".L..\n.L..\n.LL.\n....\n"
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
        let newOrientation = 0;

          let staticShape = this._findCurrentRotatinShape();
          let currentIndex = staticShape.indexOf(this.toString());
            if (direction === 'right') {
              if(currentIndex == staticShape.length -1) {
                newOrientation = 0;
              }
              else {
                newOrientation = currentIndex + 1;
              }
            } else if (direction === 'left') {
              if(currentIndex == 0) {
                newOrientation = staticShape.length -1;
              }
              else {
                newOrientation = currentIndex - 1;
              }
            }
          return new RotatingShape(staticShape[newOrientation]);
      }

      _stringToArray(input) {
        const trimmedInput = input.trim();
        const clearinput = trimmedInput.replace(/[\t\r\f ]+/g, '');
        const lines = clearinput.split('\n');
        const twoDArray = lines.map(line => line.split(''));
        return twoDArray;
      }
      
      _findCurrentRotatinShape() {
        if(RotatingShape.O_ROTATIONS.indexOf(this.toString()) > -1) {
          return RotatingShape.O_ROTATIONS;
        }
        if (RotatingShape.I_ROTATIONS.indexOf(this.toString()) > -1) {
          return RotatingShape.I_ROTATIONS;
        }
        if (RotatingShape.T_ROTATIONS.indexOf(this.toString()) > -1) {
          return RotatingShape.T_ROTATIONS;
        }
        if (RotatingShape.L_ROTATIONS.indexOf(this.toString()) > -1) {
          return RotatingShape.L_ROTATIONS;
        }
        if (RotatingShape.J_ROTATIONS.indexOf(this.toString()) > -1) {
          return RotatingShape.J_ROTATIONS;
        }
        throw new Error("now shape found");
      }

}