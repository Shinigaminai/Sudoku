# Sudoku Web App – UI Plan

This document outlines the design and behavior of the Sudoku web app UI, including puzzle generation, navigation, and controls.

---

## 1. Home / Generator Page

**Purpose:** Allow the user to generate a new Sudoku puzzle with custom options.

### Layout

- **Header**: App title / logo
- **Form / Controls**:
  - Difficulty selector (easy, medium, hard)
  - Optional: number of prefilled cells (if overriding difficulty)
  - Seed input (optional; leave blank for random)
  - "Generate Puzzle" button
- **Footer / Info**: Short instructions or links

### Behavior

1. User selects options (difficulty / prefilled cells / seed).
2. User clicks **"Generate Puzzle"**.
3. A **new page opens** (or navigates) to `/sudoku/{solutionHex}-{initMaskHex}`:
   - URL encodes the full puzzle for determinism and sharing.
4. Form inputs are **not reused on the puzzle page**; the puzzle page relies entirely on URL state.

---

## 2. Sudoku Page

**Purpose:** Display the puzzle, allow solving, and sharing.

### Layout

- **Header**
  - Home button (navigates back to generator page)
  - Optional puzzle info (difficulty / seed)
- **Sudoku Grid**
  - 9×9 grid
  - Fixed cells visually distinct (bold, colored background)
  - Editable cells accept keyboard / touch input
  - Optional highlighting of selected cell
- **Controls / Toolbar**
  - **Solve Button** – fills the grid with the solution
  - **Share Button** – copies the current URL to clipboard
  - Optional: Reset / New puzzle button (redirects to generator)
- **Footer**
  - Instructions: e.g., "Click Solve to reveal solution"

### Behavior

- On page load:
  1. Parse URL: `/sudoku/{solutionHex}-{initMaskHex}`
  2. Decode puzzle grid and mask
  3. Display prefilled cells and empty cells
- **Solve Button**:
  - Calls solver function
  - Updates grid display with solution
- **Share Button**:
  - Copies current page URL to clipboard
  - Optionally shows a "Copied!" tooltip
- **Home Button**:
  - Navigates back to the generator page
  - Does not modify URL-encoded puzzle

---

## 3. Navigation & State

- **Generator → Puzzle Page**
  - Deterministic puzzle generated from form inputs
  - URL fully encodes puzzle state
- **Puzzle Page → Generator**
  - Home button returns to generator
  - Puzzle state is discarded unless user copies/shares URL
- **Bookmarking & Sharing**
  - Users can bookmark or share the URL
  - Same URL always regenerates the same puzzle

---

## 4. Responsive Design

- **Mobile**
  - Grid fits screen width
  - Controls stacked below or above grid
  - Touch-friendly inputs
- **Tablet / Desktop**
  - Larger grid, controls side-by-side or top toolbar
- **Accessibility**
  - Clear focus for selected cell
  - Keyboard navigation (arrows, numbers)
  - High contrast mode for fixed vs editable cells

---

## 5. Styling

- Modern, minimal design
- Fixed cells: muted background, bold font
- Editable cells: light background, highlight on selection
- Buttons: clear labels, primary color for Solve / Generate
- Optional: subtle animations when puzzle is solved or copied

---

## 6. Component Breakdown (Svelte)

- `GeneratorForm.svelte`
  - Difficulty / seed inputs
  - Generate button
- `PuzzlePage.svelte`
  - Imports `PuzzleGrid.svelte`
  - Imports toolbar buttons (Solve, Share, Home)
  - Reads URL parameters and decodes puzzle
- `PuzzleGrid.svelte`
  - Renders 9×9 grid
  - Handles editable cells and keyboard input
- `Toolbar.svelte` (optional)
  - Buttons and click handlers

---

## 7. Next Steps

1. Implement puzzle page that reads URL, decodes puzzle, renders grid
2. Add Solve / Share / Home buttons with their respective behaviors
3. Implement generator page with inputs and navigation to URL-encoded puzzle page
4. Make the UI responsive and mobile-friendly
5. Add unit / integration tests for URL-based puzzle reconstruction
