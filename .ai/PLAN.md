# Project Tasks – Sudoku Web App

This task file defines the next steps for building the Sudoku web app, with a strong focus on determinism, testability, and clean architecture.  
Tasks are ordered to support iterative development and effective collaboration with an AI.

## Phase 1 – Project Foundations

### 1. Define Core Domain Types

- [ ] Define TypeScript types for:
  - Sudoku grid
  - Cell (value, fixed/editable)
  - Difficulty levels
  - Generation options
- [ ] Ensure types are framework-agnostic (no Svelte imports)

**Goal:** Establish a clear, reusable domain model.

### 2. Encoding & Decoding Primitives (Detailed Description)

- [ ] Create a full solution encoding
- [ ] Create an initial field mask encoding
- [ ] Determine URL Composition

**Goal:** Foundation for deterministic Sudoku generation.

## Phase 2 – Sudoku Logic (Framework-Agnostic)

### 3. Sudoku Grid Utilities

- [ ] Create helpers for:
  - Validating rows, columns, and boxes
  - Checking overall grid validity
- [ ] Add unit tests for all validation functions

**Goal:** Reliable, testable core logic.

### 4. Sudoku Solver

- [ ] Implement a solver for:
  - Verifying puzzle solvability
  - Providing full solutions
  - Optionally checking for unique solutions
- [ ] Add unit tests for:
  - Correctness on solved grids
  - Partially filled grids
  - Empty grids
  - Unsolvable grids
  - Unique solution detection
- [ ] Keep solver **framework-agnostic** and deterministic

**Goal:** Enable solution display, puzzle validation, and generator verification.

### 5. Sudoku Generator

- [ ] Implement a full Sudoku generator
- [ ] Ensure generated grids are always solvable
  - Start with filling the three diagonal boxes as they are independent
- [ ] Add unit tests:
  - Deterministic encoding and functional reconstruction from seed
  - Valid Sudoku constraints

**Goal:** Generate complete, valid Sudoku solutions.

### 6. Puzzle Creation (Difficulty)

- [ ] Define difficulty by number of prefilled cells
- [ ] Implement logic to remove cells from a solved grid
- [ ] Ensure resulting puzzle has:
  - A valid solution
  - A consistent difficulty level
- [ ] Add tests per difficulty level

**Goal:** Controlled puzzle difficulty.

## Phase 3 – URL & App Integration

### 7. URL-Based State

- [ ] Define URL schema (seed, difficulty)
- [ ] Parse URL parameters in SvelteKit
- [ ] Regenerate puzzles from URL only (no hidden state)

**Goal:** Full reproducibility via URL.

### 8. App State Management

- [x] Separate UI state from puzzle logic
- [x] Ensure puzzle generation logic lives outside Svelte components
- [x] Write lightweight component tests

**Goal:** Maintain clear logic/UI separation.

## Phase 4 – UI & UX

### 9. Sudoku Grid Component

- [ ] Render grid with Tailwind CSS
- [ ] Distinguish fixed vs editable cells
- [ ] Ensure keyboard and mobile usability

**Goal:** Clean, distraction-free UI.

### 10. Controls & Settings

- [ ] Difficulty selector
- [ ] Generate new Sudoku button
- [ ] Show / hide solution
- [ ] Update URL when settings change

**Goal:** Simple, intuitive interactions.

### 11. Responsive Design

- [ ] Optimize layout for:
  - Mobile
  - Tablet
  - Desktop
- [ ] Test touch interactions

**Goal:** First-class experience on all devices.

## Phase 5 – Output & Polish

### 12. Print to PDF

- [ ] Create print-friendly layout
- [ ] Ensure solution can be optionally included
- [ ] Test browser print output

**Goal:** High-quality printable Sudokus.

### 13. Testing & Quality

- [ ] Achieve strong test coverage for:
  - Generator
  - Solver
  - Difficulty logic
- [ ] Add regression tests for known seeds

**Goal:** Confidence in correctness and reproducibility.

### 14. Documentation

- [ ] Document Sudoku generation approach
- [ ] Explain deterministic seed usage
- [ ] Add contributor guidelines

**Goal:** Make the project understandable and extensible.

## Guiding Principles

- Determinism over randomness
- Logic first, UI second
- Tests before refactors
- URL is the source of truth

## Notes for AI Collaboration

When working with an AI:

- Prefer small, focused tasks
- Always request unit tests for logic changes
- Keep domain logic free of framework dependencies
- Validate determinism whenever randomness is involved
