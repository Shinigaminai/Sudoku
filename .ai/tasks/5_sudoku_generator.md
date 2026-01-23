## Step 5 – Sudoku Generator (Detailed Plan)

### Core Principles (non-negotiable)

Before code, let’s lock the invariants:

* Generator produces **fully solved 9×9 grids**
* Output is always:

  * Valid Sudoku
  * Solvable (trivially, because it’s solved)
* **Deterministic** when given the same seed
* **Framework-agnostic**
* Uses **no global randomness**
* Testable in isolation

---

## 5.1 Generator Architecture

### Files

```
src/lib/sudoku/
├── generator/
│   ├── sudokuGenerator.ts
│   ├── sudokuGenerator.test.ts
│   └── seededRng.ts
```

You already have:

* grid validators
* solver
* encoding/decoding

The generator will **reuse those**, not reimplement logic.

---

## 5.2 Deterministic Randomness

### Why this matters

JS `Math.random()` breaks:

* reproducibility
* testability
* URL determinism

### Solution: Seeded RNG

**Minimal, deterministic RNG** (LCG is enough):

```ts
export interface SeededRng {
  next(): number; // returns [0, 1)
}
```

Example implementation (simple, stable):

```ts
export function createSeededRng(seed: number): SeededRng {
  let state = seed >>> 0;

  return {
    next() {
      state = (1664525 * state + 1013904223) >>> 0;
      return state / 0xffffffff;
    }
  };
}
```

This gives you:

* deterministic shuffling
* reproducible grids
* testable output

---

## 5.3 Generator Algorithm (Exact Steps)

### Step 1: Create an Empty Grid

```ts
function createEmptyGrid(): SudokuGrid;
```

All cells:

* `value: null`
* `fixed: false`

This is already part of gridUtils.

---

### Step 2: Fill Diagonal 3×3 Boxes

Why?

* They don’t interact
* Reduces backtracking complexity massively

Boxes:

* (0,0)
* (3,3)
* (6,6)

Algorithm per box:

1. Create digits `[1..9]`
2. Shuffle using seeded RNG
3. Fill the 3×3 box

This is **guaranteed valid**.

---

### Step 3: Fill Remaining Cells Using Backtracking

Now use a **solver-style backtracking**, but for generation:

1. Find next empty cell (row-major)
2. Try digits 1–9
3. Shuffle digit order using RNG
4. Check grid validity
5. Recurse
6. Backtrack on failure

This is almost the same as the solver, except:

* No early exit
* Stops when grid is completely filled

---

### Step 4: Mark All Cells as Fixed

The generator returns a **solution**, not a puzzle.

```ts
fixed: true
```

for all cells.

---

## 5.4 Generator API

Keep it small and explicit:

```ts
export function generateSolvedGrid(seed: number): SudokuGrid;
```

Properties:

* Same seed → same grid
* Different seed → different grid
* No side effects

---

## 5.5 Failure Handling

In practice, generation *should not fail*, but defensively:

* If backtracking exhausts options:

  * Throw an error (this indicates a bug)
* Tests should never observe this path

---

## 5.6 Unit Tests (Critical)

1. Determinism
2. Seed Variance (generates different grids for different seeds)
3. Valid Sudoku Constraints
4. Solver Compatibility
5. Encoding Roundtrip (Grid can be URL encoded and decoded)
