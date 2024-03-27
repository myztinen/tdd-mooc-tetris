
import { describe, test } from "vitest";
import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";

describe("Rotating 4x4 T shape", () => {
  const shape = new RotatingShape(
     `....
      TTT.
      .T..
      ....`
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `....
       TTT.
       .T..
       ....`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.newRotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.newRotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });

  test("can be rotated twice left/counter-clockwise", () => {
    expect(shape.newRotateLeft().newRotateLeft().toString()).to.equalShape(
      `....
       .T..
       TTT.
       ....`
    );
  });
});