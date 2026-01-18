### 2.4 Sudoku Solver (Detailed Description)

This task defines the framework-agnostic, deterministic Sudoku solver that ensures any valid puzzle can be solved and optionally checks for unique solutions.

---

#### Solver Algorithm

1. Start with a **partially filled Sudoku grid** containing 81 cells.
2. Identify the **first empty cell** (value === null) in a fixed, well-defined order (row-major, top-left to bottom-right).
3. Attempt to place digits **1–9** in the empty cell one at a time.
4. For each candidate digit:

   * Check if placing it keeps the **grid valid** (rows, columns, and boxes) using grid validation helpers.
   * If valid, **recurse** to the next empty cell.
   * If invalid, **backtrack** and try the next candidate.

5. Continue this process until:

   * All cells are filled → puzzle is solved
   * No valid candidates remain → puzzle is unsolvable

---

#### Unique Solution Detection (Optional)

1. After finding a first solution, continue searching for additional solutions.
2. If **more than one solution** exists:

   * Return `isSolvable = true` but indicate that the solution is **not unique**.
3. If exactly one solution exists:

   * Return `solvedGrid` and `isSolvable = true`.

---

#### Solver API

The solver exposes a **pure, framework-agnostic TypeScript API**:

```ts
export interface SolverResult {
  solvedGrid?: SudokuGrid; // filled grid if solvable
  isSolvable: boolean;     // indicates if a solution exists
}

export function solveSudoku(grid: SudokuGrid): SolverResult;
export function hasUniqueSolution(grid: SudokuGrid): boolean;
