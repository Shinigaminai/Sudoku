import type { SudokuGrid } from "$lib/types";

/**
 * Flattens a solved Sudoku grid into an array of 81 digits (row-major order).
 */
export function flattenSolutionGrid(grid: SudokuGrid): number[] {
  if (grid.length !== 9) {
    throw new Error("Sudoku grid must have 9 rows");
  }

  const digits: number[] = [];

  for (const row of grid) {
    if (row.length !== 9) {
      throw new Error("Each Sudoku row must have 9 cells");
    }

    for (const cell of row) {
      if (cell.value === null) {
        throw new Error("Solution grid must not contain null values");
      }
      digits.push(cell.value);
    }
  }

  if (digits.length !== 81) {
    throw new Error("Sudoku grid must contain exactly 81 values");
  }

  return digits;
}

/**
 * Encodes 81 Sudoku digits into a hex string.
 */
export function encodeSolutionDigitsToHex(digits: number[]): string {
  if (digits.length !== 81) {
    throw new Error("Expected exactly 81 digits");
  }

  const decimalString = digits.join("");

  if (!/^[1-9]{81}$/.test(decimalString)) {
    throw new Error("Digits must be in range 1–9");
  }

  const bigIntValue = BigInt(decimalString);
  return bigIntValue.toString(16);
}

/**
 * Decodes a hex string back into 81 Sudoku digits.
 */
export function decodeSolutionHex(hex: string): number[] {
  if (!/^[0-9a-fA-F]+$/.test(hex)) {
    throw new Error("Invalid hex string");
  }

  const decimalString = BigInt(`0x${hex}`).toString(10);

  if (decimalString.length !== 81) {
    throw new Error("Decoded solution must have exactly 81 digits");
  }

  return decimalString.split("").map((char) => {
    const value = Number(char);
    if (value < 1 || value > 9) {
      throw new Error("Decoded digit out of range");
    }
    return value;
  });
}
