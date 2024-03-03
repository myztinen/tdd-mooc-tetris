export class RotatingShape {
    shape;
    constructor(shape) {
        this.shape = shape.replace(/[\t\r\f ]+/g, '').concat('\n');
      }

      toString() {
        return this.shape
      }

      rotateRight() {
        return;
      }

      rotateLeft() {

      }

}