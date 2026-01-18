### 1.2 Encoding & Decoding Primitives (Detailed Description)

This task defines the deterministic encoding scheme used to represent a Sudoku puzzle entirely within the URL.

#### Full Solution Encoding (`solutionHex`)

1. Start from a **fully solved Sudoku grid** containing exactly 81 values (each in the range 1–9).
2. Flatten the grid in a fixed, well-defined order (row-major, top-left to bottom-right) into an array of 81 digits.
3. Concatenate these digits into a **single decimal number with exactly 81 digits**.

   * Each digit represents one Sudoku cell value.
   * No separators or padding characters are used.
4. Convert this large decimal number into a **hexadecimal string**.
5. The resulting hex string (`solutionHex`) uniquely and deterministically represents the complete Sudoku solution.

Decoding reverses this process exactly:

* Hex → decimal → split into 81 digits → reconstruct the 9×9 grid.

---

#### Initial Field Mask Encoding (`initMaskHex`)

1. Create a binary mask with **exactly 81 bits**, aligned with the same cell order used for the solution.
2. Each bit represents whether a cell is initially visible:

   * `1` → cell value is prefilled (fixed)
   * `0` → cell is empty (user-editable)
3. Concatenate the bits into a single binary number.
4. Convert the binary number into a **hexadecimal string**.
5. The resulting hex string (`initMaskHex`) represents which fields are shown at puzzle start.

Decoding reverses this process:

* Hex → binary → 81-bit mask → boolean visibility array.

---

#### URL Composition

The canonical URL format is:

```
/sudoku/{solutionHex}-{initMaskHex}
```

Using the same `solutionHex` and `initMaskHex` must always reconstruct:

* The same solved Sudoku
* The same playable puzzle state

---

#### Requirements

* Encoding and decoding must be **lossless**
* All conversions must be **pure and deterministic**
* No UI, browser, or framework dependencies
* Unit tests must verify:

  * Encode → decode round trips
  * Fixed length and ordering assumptions
  * Error handling for invalid hex input

**Result:**
The URL is the single source of truth for the entire Sudoku puzzle.
