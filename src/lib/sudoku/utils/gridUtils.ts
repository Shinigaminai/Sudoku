import type { SudokuCell, SudokuGrid, SudokuValue } from "$lib/types";

/* ------------------------------------------------------------------ */
/* Cell helpers */
/* ------------------------------------------------------------------ */

export const createCell = (
  value: SudokuValue,
  fixed = false
): SudokuCell => ({
  value,
  fixed,
});

/* ------------------------------------------------------------------ */
/* Grid creation */
/* ------------------------------------------------------------------ */

/**
 * Creates a fully solved, valid Sudoku grid.
 * Useful for tests and as a known-good reference.
 */
export const createSolvedGrid = (): SudokuGrid => [
  [createCell(5), createCell(3), createCell(4), createCell(6), createCell(7), createCell(8), createCell(9), createCell(1), createCell(2)],
  [createCell(6), createCell(7), createCell(2), createCell(1), createCell(9), createCell(5), createCell(3), createCell(4), createCell(8)],
  [createCell(1), createCell(9), createCell(8), createCell(3), createCell(4), createCell(2), createCell(5), createCell(6), createCell(7)],
  [createCell(8), createCell(5), createCell(9), createCell(7), createCell(6), createCell(1), createCell(4), createCell(2), createCell(3)],
  [createCell(4), createCell(2), createCell(6), createCell(8), createCell(5), createCell(3), createCell(7), createCell(9), createCell(1)],
  [createCell(7), createCell(1), createCell(3), createCell(9), createCell(2), createCell(4), createCell(8), createCell(5), createCell(6)],
  [createCell(9), createCell(6), createCell(1), createCell(5), createCell(3), createCell(7), createCell(2), createCell(8), createCell(4)],
  [createCell(2), createCell(8), createCell(7), createCell(4), createCell(1), createCell(9), createCell(6), createCell(3), createCell(5)],
  [createCell(3), createCell(4), createCell(5), createCell(2), createCell(8), createCell(6), createCell(1), createCell(7), createCell(9)],
];

/**
 * Creates an empty 9×9 Sudoku grid.
 */
export const createEmptyGrid = (): SudokuGrid =>
  Array.from({ length: 9 }, () =>
    Array.from({ length: 9 }, () => createCell(null))
  ) as unknown as SudokuGrid;

/* ------------------------------------------------------------------ */
/* Grid utilities */
/* ------------------------------------------------------------------ */

/**
 * Deep clone a Sudoku grid without mutating the original.
 */
export const cloneGrid = (grid: SudokuGrid): SudokuGrid =>
  grid.map(row => row.map(cell => ({ ...cell }))) as unknown as SudokuGrid;

/**
 * Prints a Sudoku grid to the console in a readable format.
 * Empty cells are shown as dots.
 * 
 * Example output:
 * 5 3 . | . 7 . | . . .
 * 6 . . | 1 9 5 | . . .
 * . 9 8 | . . . | . 6 .
 * ------+-------+------
 * ...
 *
 * @param grid SudokuGrid to print
 */
export function printGrid(grid: SudokuGrid): void {
  const lines: string[] = [];

  for (let r = 0; r < 9; r++) {
    const row = grid[r].map(cell => (cell.value !== null ? cell.value.toString() : "."));
    const rowString =
      row.slice(0, 3).join(" ") +
      " | " +
      row.slice(3, 6).join(" ") +
      " | " +
      row.slice(6, 9).join(" ");
    lines.push(rowString);

    if (r === 2 || r === 5) {
      lines.push("------+-------+------");
    }
  }

  console.log(lines.join("\n"));
}

