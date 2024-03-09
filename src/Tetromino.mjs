import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    height;
    width;
    static T_SHAPE = new Tetromino(
        `.T.
         TTT
         ...`);
    static I_SHAPE = new RotatingShape(
      `.....
       .....
       IIII.
       .....
       .....`);

    constructor(shape) {
        this.shape = new RotatingShape(shape);

      }

      toString() {
        return this.shape.toString();
      }
    
      rotateRight() {
        return this.shape._rotate('right');
      }
    
      rotateLeft() {
        return this.shape._rotate('left');
      }

    
}