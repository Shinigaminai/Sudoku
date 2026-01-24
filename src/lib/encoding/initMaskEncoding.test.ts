import { describe, it, expect } from "vitest";
import {
  encodeInitMaskToHex,
  decodeInitMaskHex,
} from "./initMaskEncoding";

describe("initial mask encoding", () => {
  it("round-trips boolean mask correctly", () => {
    const mask = Array.from({ length: 81 }, (_, i) => i % 2 === 0);
    const hex = encodeInitMaskToHex(mask);
    const decoded = decodeInitMaskHex(hex);

    expect(decoded).toEqual(mask);
  });

  it("rejects invalid mask length", () => {
    expect(() => encodeInitMaskToHex([true])).toThrow();
  });

  it("rejects invalid hex input", () => {
    expect(() => decodeInitMaskHex("xyz")).toThrow();
  });
});
