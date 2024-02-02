export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return this.createLine().repeat(this.height);
  }

  createLine() {
    return ".".repeat(this.width).concat("\n");
  }
}
