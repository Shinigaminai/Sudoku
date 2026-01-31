# Step 6 – Puzzle Creation (Difficulty)

## Goal

Transform a fully solved Sudoku grid into a playable puzzle with a controlled difficulty level.

---

## Core Principles

- Difficulty is defined **by the number of prefilled cells**.
- Puzzles must be **solvable** (using the solver from Step 4).
- Generation must be **deterministic** (same seed + difficulty → same puzzle).
- Framework-agnostic and fully testable.

---

## Puzzle Generation Algorithm

1. **Start with a fully solved grid** from the Sudoku generator.
2. **Determine the number of prefilled cells** based on difficulty:
   - Easy → ~45 prefilled
   - Medium → ~36 prefilled
   - Hard → ~27 prefilled
3. **Generate a list of all cell positions** `[0..80]` and shuffle using a seeded RNG.
4. **Remove cells** in the shuffled order until only the target number of prefilled cells remains.
5. **Mark remaining cells as fixed**, removed cells as editable.
6. **Optional:** verify solvability with the solver (mostly for tests).

---

## Determinism

- All randomness is seeded.
- Same seed and difficulty always produces the same puzzle.
- This ensures reproducibility and bookmarkable/shareable puzzles.

---

## Validation

- Ensure the resulting puzzle:
  - Has the correct number of prefilled cells.
  - Maintains Sudoku validity for all rows, columns, and boxes.
  - Does not modify the solution values outside of removed cells.

---

## Testing Focus

1. **Prefilled counts** per difficulty.
2. **Deterministic puzzles** for same seed + difficulty.
3. **Different puzzles** for different seeds.
4. **Integrity of remaining cells** (values unchanged).
5. **Grid validity** after cell removal.

---

## Notes

- This step separates **puzzle creation** from **solution generation**.
- The output is a playable puzzle; the solution remains in the original solved grid.
- Later steps will integrate this with **URL-based puzzle encoding** and **UI display**.
