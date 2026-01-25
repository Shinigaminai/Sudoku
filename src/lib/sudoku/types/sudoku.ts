/** Represents a single Sudoku cell value: 0 = empty, 1–9 = filled */
export type SudokuValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export const EmptyCellValue = 0;
export const FilledCellValues: SudokuValue[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/** A single cell in the Sudoku grid */
export interface SudokuCell {
  value: SudokuValue;
  fixed: boolean;
}

/** 9x9 Sudoku grid */
export type SudokuGrid = SudokuCell[][];

// export type SudokuGrid = readonly [
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[],
//   readonly SudokuCell[]
// ];

export type Difficulty = "solved" | "easy" | "medium" | "hard" | "expert";

export function isSudokuValue(value: number): value is SudokuValue {
  return Number.isInteger(value) && value >= 0 && value <= 9;
}
