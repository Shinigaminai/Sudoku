# Step 7 – URL-Based State

## Goal
Ensure that every Sudoku puzzle is fully reproducible, bookmarkable, and shareable via a URL, without relying on hidden or in-memory state.

---

## Core Principles

* **Deterministic generation**: A given URL must always produce the exact same puzzle and solution.  
* **No hidden state**: Puzzle generation relies solely on URL parameters.  
* **Framework integration**: Use SvelteKit's routing and parameter parsing.  
* **Ease of sharing**: Users can copy or bookmark URLs to revisit or share specific puzzles.

---

## URL Schema

Define a canonical format to encode all necessary information:  
```/sudoku/{solutionHex}-{initMaskHex}```  

* `solutionHex` – Encodes the fully solved grid (all 81 numbers) in hexadecimal.  
* `initMaskHex` – Encodes which cells are initially visible (81-bit mask → hex).  

Optional extensions:

* Difficulty can be inferred from `initMaskHex` or included explicitly for convenience.  

---

## Parsing and Puzzle Reconstruction

1. **Extract URL parameters** using SvelteKit page parameters.  
2. **Decode `solutionHex`** to reconstruct the solved grid.  
3. **Decode `initMaskHex`** to determine which cells are prefilled.  
4. **Recreate the playable puzzle**:

   * Prefilled cells → `fixed: true`  
   * Empty cells → `fixed: false`, `value: null`  

5. **Render the puzzle** in the UI without any other state mutation.

---

## Determinism and Validation

* Using the same `solutionHex` + `initMaskHex` must always produce:

  * The same solved grid  
  * The same playable puzzle state  

* Add unit tests to verify:

  * Roundtrip encoding/decoding  
  * Correct number of prefilled cells  
  * Puzzle integrity and validity  

---

## Integration Notes

* Consider exposing utility functions:

  * `encodePuzzle(grid: SudokuGrid) => { solutionHex, initMaskHex }`  
  * `decodePuzzle(solutionHex, initMaskHex) => SudokuGrid`  

* URL-driven approach allows:

  * Bookmarking specific puzzles  
  * Sharing exact puzzles with others  
  * Replaying or regenerating puzzles deterministically  

---

## Next Steps

1. Implement encoding/decoding utilities.  
2. Integrate URL parsing in SvelteKit routes.  
3. Test that puzzles regenerate correctly from the URL.
