import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    currentOrientation;
    shapes;

    static T_SHAPE = new Tetromino(
        `.T.
        TTT
        ...`, 4);
    static I_SHAPE = new Tetromino(
        `.....
        .....
        IIII.
        .....
        .....`, 2);
    static O_SHAPE = new Tetromino(
        `.OO
         .OO
         ...`, 1);

    constructor(shape, orientationCount, currentOrientation=0) {
        this.shapes = [];
        this.shape = new RotatingShape(shape);
        let tempShape = this.shape;
        this.orientationCount = orientationCount;
        for (let i = 0; i < orientationCount; i++) {
          this.shapes.push(tempShape);
          tempShape = tempShape.rotateRight();
        }
        this.currentOrientation = currentOrientation;
      }

      toString() {
        return this.shapes[this.currentOrientation].toString();
      }
    
      rotateRight() {
        let newOrientation = (this.shapes.length + (this.currentOrientation +1)) % this.shapes.length;
        return new Tetromino(this.shape.toString().trim(), this.orientationCount, newOrientation);
      }
    
      rotateLeft() {
        let newOrientation = (this.shapes.length + (this.currentOrientation -1)) % this.shapes.length;
        return new Tetromino(this.shape.toString().trim(), this.orientationCount, newOrientation);

      }

      rows() {
        return this.shapes[this.currentOrientation].height;
      }

      columns() {
        return this.shapes[this.currentOrientation].width;
      }

      cellAt() {
        return this.shapes[this.currentOrientation].width;
      }
}