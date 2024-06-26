
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
    expect(shape.rotateRight().toString()).to.equalShape(
      `.T..
       TT..
       .T..
       ....`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `.T..
       .TT.
       .T..
       ....`
    );
  });

  test("can be rotated twice left/counter-clockwise", () => {
    expect(shape.rotateLeft().rotateLeft().toString()).to.equalShape(
      `....
       .T..
       TTT.
       ....`
    );
  });
});

describe("Rotating 4x4 L shape", () => {
  const shape = new RotatingShape(
     `....
      LLL.
      L...
      ....`
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
     `....
      LLL.
      L...
      ....`
    );
  });
});


describe("Rotating 4x4 J shape", () => {
  const shape = new RotatingShape(
     `....
      JJJ.
      ..J.
      ....`
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
    `....
     JJJ.
     ..J.
     ....`
    );
  });
});