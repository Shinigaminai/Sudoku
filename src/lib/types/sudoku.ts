export type SudokuValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | null;

export interface SudokuCell {
  value: SudokuValue;
  fixed: boolean;
}

export type SudokuGrid = readonly [
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[],
  readonly SudokuCell[]
];

export type Difficulty = "easy" | "medium" | "hard" | "expert";
