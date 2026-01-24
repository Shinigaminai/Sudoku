import type { SudokuGrid, SudokuCell, SudokuValue } from "$lib/sudoku/types";
import { validateGrid } from "../validation/gridValidation";

export interface SolverResult {
  solvedGrid?: SudokuGrid;
  isSolvable: boolean;
}

/**
 * Solve a Sudoku grid using backtracking.
 * Returns:
 *   - isSolvable: true if a solution exists
 *   - solvedGrid: the filled grid if solvable, otherwise undefined
 */
export function solveSudoku(grid: SudokuGrid): { isSolvable: boolean; solvedGrid?: SudokuGrid } {
  // Check if starting grid is valid
  if (!validateGrid(grid)) {
    return { isSolvable: false };
  }

  // Clone the grid to avoid mutating original
  const g: SudokuGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

  function backtrack(r = 0, c = 0): boolean {
    if (r === 9) return true; // solved

    const [nextR, nextC] = c === 8 ? [r + 1, 0] : [r, c + 1];

    if (g[r][c].value !== 0) return backtrack(nextR, nextC);

    for (let num = 1 as SudokuValue; num <= 9; num++) {
      g[r][c].value = num;
      if (validateGrid(g)) {
        if (backtrack(nextR, nextC)) return true;
      }
      g[r][c].value = 0; // backtrack
    }

    return false;
  }

  const isSolvable = backtrack();
  return { isSolvable, solvedGrid: isSolvable ? g : undefined };
}

/**
 * Checks whether a Sudoku puzzle has exactly one solution.
 */
/**
 * Check if a grid has a unique solution.
 * Treats 0 as empty.
 */
export function hasUniqueSolution(grid: SudokuGrid): boolean {
  if (!validateGrid(grid)) return false;

  let solutionCount = 0;

  function solve(g: SudokuGrid, r = 0, c = 0): boolean {
    if (r === 9) {
      solutionCount++;
      return solutionCount > 1; // stop if more than one solution found
    }

    const [nextR, nextC] = c === 8 ? [r + 1, 0] : [r, c + 1];

    if (g[r][c].value !== 0) {
      return solve(g, nextR, nextC);
    }

    for (let num = 1 as SudokuValue; num <= 9; num++) {
      g[r][c].value = num;
      if (validateGrid(g)) {
        if (solve(g, nextR, nextC)) return true;
      }
      g[r][c].value = 0; // backtrack
    }

    return false;
  }

  solve(JSON.parse(JSON.stringify(grid))); // deep clone to avoid mutation
  return solutionCount === 1;
}