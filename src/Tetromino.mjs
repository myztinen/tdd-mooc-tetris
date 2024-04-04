import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    currentOrientation;
    name;
    static T_SHAPE = new Tetromino(
     `....
      TTT.
      .T..
      ....`, 'T');
    static I_SHAPE = new Tetromino(
     `....
      IIII
      ....
      ....`, 'I');
    static O_SHAPE = new Tetromino(
     `....
      .OO.
      .OO.
      ....`, 'O');
    static J_SHAPE = new Tetromino(
     `....
      JJJ.
      ..J.
      ....`, 'J');
          
    static L_SHAPE = new Tetromino(
     `....
      LLL.
      L...
      ....`, 'L');
    static S_SHAPE = new Tetromino(
     `....
      .SS.
      SS..
      ....`, 'S');
    static Z_SHAPE = new Tetromino(
     `....
      ZZ..
      .ZZ.
      ....`, 'Z');

    constructor(shape, name="unknown") {
        this.shape = new RotatingShape(shape);
        this.name = name;
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