import { EmptyCellValue, type SudokuGrid, type SudokuValue } from "$lib/sudoku/types";
import { createEmptyGrid, hasNoEmptyCell } from "../utils/gridUtils";
import { createSeededRng, type SeededRng } from "./seededRng";
import { shuffle } from "./shuffle";
import { validateGrid } from "../validation/gridValidation";

/* ------------------------------------------------------------------ */
/* Fill a 3x3 box at (startRow, startCol) deterministically */
function fillBox(grid: SudokuGrid, startRow: number, startCol: number, rng: SeededRng) {
  const digits: SudokuValue[] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);

  let idx = 0;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      grid[startRow + r][startCol + c].value = digits[idx++];
    }
  }
}

/* ------------------------------------------------------------------ */
/* Find the next empty cell (row-major) */
function findEmptyCell(grid: SudokuGrid): [number, number] | null {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c].value === EmptyCellValue) return [r, c];
    }
  }
  return null;
}

/* ------------------------------------------------------------------ */
/* Backtracking fill for remaining cells */
function fillRemaining(grid: SudokuGrid, rng: SeededRng): boolean {
  const cellPos = findEmptyCell(grid);
  if (!cellPos) return true; // done

  const [row, col] = cellPos;
  const candidates: SudokuValue[] = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9], rng);

  for (const num of candidates) {
    grid[row][col].value = num;
    if (validateGrid(grid)) {
      if (fillRemaining(grid, rng)) return true;
    }
    grid[row][col].value = 0; // backtrack
  }

  return false; // no valid number fits
}

/* ------------------------------------------------------------------ */
/* Main API */
export function generateSolvedGrid(seed: number): SudokuGrid {
  const rng = createSeededRng(seed);
  const grid = createEmptyGrid();

  // Fill the three diagonal boxes first
  fillBox(grid, 0, 0, rng);
  fillBox(grid, 3, 3, rng);
  fillBox(grid, 6, 6, rng);

  // Fill remaining cells
  const success = fillRemaining(grid, rng);

  if (!success) {
    throw new Error("Failed to generate a Sudoku grid. This should never happen.");
  }

  // Mark all cells as fixed and replace any remaining 0s (just in case)
  if(!hasNoEmptyCell(grid)) {
    throw new Error(`generateSolvedGrid contains an EmptyCellValue`);
  }

  return grid;
}

