import { describe, it, expect } from "vitest";
import {
  encodeSolutionDigitsToHex,
  decodeSolutionHex,
} from "./solutionEncoding";

describe("solution encoding", () => {
  it("round-trips solution digits correctly", () => {
    const digits = Array.from({ length: 81 }, (_, i) => ((i % 9) + 1));
    const hex = encodeSolutionDigitsToHex(digits);
    const decoded = decodeSolutionHex(hex);

    expect(decoded).toEqual(digits);
  });

  it("rejects invalid digit counts", () => {
    expect(() => encodeSolutionDigitsToHex([1, 2, 3])).toThrow();
  });

  it("rejects invalid hex input", () => {
    expect(() => decodeSolutionHex("not-hex")).toThrow();
  });
});
