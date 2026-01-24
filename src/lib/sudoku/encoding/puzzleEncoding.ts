import type { SudokuCell, SudokuGrid, SudokuValue } from "$lib/sudoku/types";
import { encodeSolutionGrid, decodeSolutionGrid } from "./solutionEncoding";
import { encodeMask, decodeMask } from "./maskEncoding";
import { createCell } from "../utils/gridUtils";

/**
 * Encode a Sudoku puzzle into URL-safe primitives.
 *
 * - solutionHex encodes the full solved grid
 * - initMaskHex encodes which cells are initially visible
 */
export function encodePuzzle(grid: SudokuGrid): {
  solutionHex: string;
  initMaskHex: string;
} {
  const solutionHex = encodeSolutionGrid(grid);

  const initMaskHex = encodeMask(
    grid.map((row) => row.map((cell) => cell.fixed))
  );

  return {
    solutionHex,
    initMaskHex,
  };
}

/**
 * Decode a Sudoku puzzle from URL primitives.
 *
 * Reconstructs the full grid and applies fixed/editable state
 * based on the init mask.
 */
export function decodePuzzle(
  solutionHex: string,
  initMaskHex: string
): SudokuGrid {
  const solutionGrid = decodeSolutionGrid(solutionHex);
  const initMask = decodeMask(initMaskHex, 9, 9);

  return solutionGrid.map((row: SudokuCell[], r) =>
    row.map((cell, c) => {
      const fixed = initMask[r][c];
      const value: SudokuValue = fixed ? cell.value : 0;

      return createCell(value, fixed);
    })
  ) as SudokuGrid;
}

/**
 * Checks if a string is a valid puzzle encoding.
 * Valid format: "{solutionHex}-{initMaskHex}"
 * Both parts must be valid hex strings.
 */
export function isPuzzleEncoding(value: string): boolean {
  if (typeof value !== 'string') return false;

  const parts = value.split('-');
  if (parts.length !== 2) return false;

  const [solutionHex, initMaskHex] = parts;

  // Hex regex: one or more 0-9, a-f, A-F
  const hexRegex = /^[0-9a-fA-F]+$/;

  return hexRegex.test(solutionHex) && hexRegex.test(initMaskHex);
}