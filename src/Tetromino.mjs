import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    currentOrientation;
    shapes;

    static T_SHAPE = new Tetromino(
       `....
        TTT.
        .T..
        ....`, 4);
    static I_SHAPE = new Tetromino(
       `....
        IIII
        ....
        ....`, 2);
    static O_SHAPE = new Tetromino(
        `....
         .OO.
         .OO.
         ....`, 1);

    constructor(shape, dropHeight) {
        this.shape = new RotatingShape(shape);
      }

      toString() {
        return this.shape.toString();
      }
    
      rotateRight() {
        return new Tetromino(this.shape.newRotateRight().toString().trim());
      }
    
      rotateLeft() {
        return new Tetromino(this.shape.newRotateLeft().toString().trim());
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