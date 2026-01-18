import type { SudokuCell, SudokuGrid } from "$lib/types";

/**
 * Validates that an array of 9 Sudoku values contains no duplicates (ignoring nulls)
 */
export function isValidGroup(values: (number | null)[]): boolean {
  const seen = new Set<number>();
  for (const val of values) {
    if (val !== null) {
      if (seen.has(val)) return false;
      seen.add(val);
    }
  }
  return true;
}

/**
 * Validate all rows of the grid
 */
export function validateRows(grid: SudokuGrid): boolean {
  return grid.every((row) => isValidGroup(row.map((cell) => cell.value)));
}

/**
 * Validate all columns of the grid
 */
export function validateColumns(grid: SudokuGrid): boolean {
  for (let col = 0; col < 9; col++) {
    const column = grid.map((row) => row[col].value);
    if (!isValidGroup(column)) return false;
  }
  return true;
}

/**
 * Validate a single 3x3 box given its top-left coordinates
 */
export function validateBox(grid: SudokuGrid, startRow: number, startCol: number): boolean {
  const values: (number | null)[] = [];
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      values.push(grid[r][c].value);
    }
  }
  return isValidGroup(values);
}

/**
 * Validate all 3x3 boxes
 */
export function validateBoxes(grid: SudokuGrid): boolean {
  for (let r = 0; r < 9; r += 3) {
    for (let c = 0; c < 9; c += 3) {
      if (!validateBox(grid, r, c)) return false;
    }
  }
  return true;
}

/**
 * Validate the entire grid: rows, columns, boxes
 */
export function validateGrid(grid: SudokuGrid): boolean {
  return validateRows(grid) && validateColumns(grid) && validateBoxes(grid);
}
