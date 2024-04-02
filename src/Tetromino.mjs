import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    currentOrientation;
    shapes;

    static T_SHAPE = new Tetromino(
     `....
      TTT.
      .T..
      ....`);
    static I_SHAPE = new Tetromino(
     `....
      IIII
      ....
      ....`);
    static O_SHAPE = new Tetromino(
     `....
      .OO.
      .OO.
      ....`);
    static J_SHAPE = new Tetromino(
     `....
      JJJ.
      ..J.
      ....`);
          
    static L_SHAPE = new Tetromino(
     `....
      LLL.
      L...
      ....`);

    constructor(shape) {
        this.shape = new RotatingShape(shape);
      }

      toString() {
        return this.shape.toString();
      }
    
      rotateRight() {
        return new Tetromino(this.shape.rotateRight().toString().trim());
      }
    
      rotateLeft() {
        return new Tetromino(this.shape.rotateLeft().toString().trim());
      }

      rows() {
        return this.shape.height;
      }

      columns() {
        return this.shape.width;
      }

      cellAt(col, row) {
        return this.shape.cellAt(col, row);
      }
      
      rowAt(row) {
        this.shape.rowAt[row];
      }
}