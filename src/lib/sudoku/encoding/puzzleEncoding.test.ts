import { describe, it, expect } from "vitest";
import { encodePuzzle, decodePuzzle } from "./puzzleEncoding";
import type { SudokuCell, SudokuGrid } from "$lib/sudoku/types";
import { createSolvedGrid } from "../utils/gridUtils";

/**
 * Fully solved grid with a mixed fixed mask
 */
const solvedGrid: SudokuGrid = createSolvedGrid();

describe("puzzle encoding / decoding", () => {
  it("encodes and decodes a puzzle losslessly", () => {
    const { solutionHex, initMaskHex } = encodePuzzle(solvedGrid);

    const decoded = decodePuzzle(solutionHex, initMaskHex);

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const original = solvedGrid[r][c];
        const reconstructed = decoded[r][c];

        expect(reconstructed.fixed).toBe(original.fixed);

        if (original.fixed) {
          expect(reconstructed.value).toBe(original.value);
        } else {
          expect(reconstructed.value).toBe(0);
        }
      }
    }
  });

  it("is deterministic for the same input grid", () => {
    const a = encodePuzzle(solvedGrid);
    const b = encodePuzzle(solvedGrid);

    expect(a.solutionHex).toBe(b.solutionHex);
    expect(a.initMaskHex).toBe(b.initMaskHex);
  });

  it("throws on invalid hex input", () => {
    expect(() =>
      decodePuzzle("not-hex", "deadbeef")
    ).toThrow();

    expect(() =>
      decodePuzzle("deadbeef", "not-hex")
    ).toThrow();
  });
});
