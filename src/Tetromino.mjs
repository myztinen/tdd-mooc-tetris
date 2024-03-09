import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
    shape;
    height;
    width;
    orientations;
    static T_SHAPE = new Tetromino(4,
        `.T.
         TTT
         ...`);
    static I_SHAPE = new Tetromino(2,
      `.....
       .....
       IIII.
       .....
       .....`);

    constructor(orientations, shape) {
        this.shape = new RotatingShape(shape);
        this.orientations = orientations;

      }

      toString() {
        return this.shape.toString();
      }
    
      rotateRight() {
        return new Tetromino(4,this.shape._rotate('right').toString().trim());
      }
    
      rotateLeft() {
        return new Tetromino(4,this.shape._rotate('left').toString().trim());
      }

    
}