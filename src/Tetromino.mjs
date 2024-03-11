import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    height;
    width;
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

    
}