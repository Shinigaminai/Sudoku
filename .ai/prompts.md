# AI Prompts – Sudoku Web App

This file contains structured prompts to guide AI-assisted development of the Sudoku web app.
Each prompt is scoped to a single task and emphasizes determinism, testability, and clean architecture.

---

## Phase 1 – Project Foundations

### Prompt 1: Core Domain Types

> You are helping build a Sudoku web app.
>
> Define **framework-agnostic TypeScript types** for:
>
> * Sudoku grid
> * Cell (value, fixed/editable)
> * Difficulty levels
> * Generation options
>
> Requirements:
>
> * No Svelte or browser-specific code
> * Clear naming
> * Easy to test
>
> Output only TypeScript code.

---

### Prompt 2: Seeded Random Number Generator

> Implement a **deterministic seeded random number generator** in TypeScript.
>
> Requirements:
>
> * Same seed must always produce the same sequence
> * No external dependencies
> * Include unit tests using Vitest
>
> Output:
>
> * RNG implementation
> * Corresponding test file

---

## Phase 2 – Sudoku Logic (Framework-Agnostic)

### Prompt 3: Sudoku Validation Utilities

> Implement Sudoku validation utilities in TypeScript.
>
> Functions needed:
>
> * Validate a row
> * Validate a column
> * Validate a 3x3 box
> * Validate a full grid
>
> Requirements:
>
> * No UI or framework code
> * Pure functions
> * Include comprehensive unit tests
>
> Output code and tests.

---

### Prompt 4: Full Sudoku Generator

> Implement a Sudoku **solution generator** using a seeded RNG.
>
> Requirements:
>
> * Always generate a valid completed Sudoku grid
> * Deterministic output per seed
> * No UI or framework dependencies
> * Include unit tests that:
>
>   * Verify Sudoku validity
>   * Verify determinism for the same seed
>
> Output implementation and tests.

---

### Prompt 5: Puzzle Creation & Difficulty

> Implement logic to create Sudoku puzzles from a solved grid.
>
> Requirements:
>
> * Difficulty defined by number of prefilled cells
> * Resulting puzzle must:
>
>   * Be solvable
>   * Match the requested difficulty
> * Include unit tests for each difficulty level
>
> Output code and tests.

---

### Prompt 6: Sudoku Solver

> Implement a Sudoku solver in TypeScript.
>
> Use cases:
>
> * Verify puzzle solvability
> * Produce a complete solution
>
> Requirements:
>
> * Deterministic behavior
> * No UI or framework code
> * Unit tests for correctness and edge cases
>
> Output solver and tests.

---

## Phase 3 – URL & App Integration

### Prompt 7: URL Schema & Parsing

> Define a URL-based state model for a Sudoku app using SvelteKit.
>
> Requirements:
>
> * URL contains seed and difficulty
> * Parsing logic is isolated from UI
> * Regenerating from URL always produces the same puzzle
>
> Provide example routes and parsing code.

---

### Prompt 8: App State Separation

> Help refactor the app to ensure **clear separation between puzzle logic and UI**.
>
> Requirements:
>
> * Puzzle generation must live outside Svelte components
> * Components only consume prepared data
> * Provide a suggested folder structure
>
> Output explanation and example code.

---

## Phase 4 – UI & UX

### Prompt 9: Sudoku Grid Component

> Implement a Sudoku grid component in Svelte.
>
> Requirements:
>
> * Uses Tailwind CSS
> * Distinguishes fixed vs editable cells
> * Supports keyboard input
> * No puzzle logic inside the component
>
> Output component code only.

---

### Prompt 10: Controls & Settings UI

> Implement UI controls for:
>
> * Difficulty selection
> * Generating a new Sudoku
> * Showing/hiding the solution
>
> Requirements:
>
> * Updates URL parameters
> * Minimal, clean UI
> * No direct puzzle logic in components
>
> Output Svelte component code.

---

### Prompt 11: Responsive Design Pass

> Review the Sudoku UI and improve responsiveness.
>
> Requirements:
>
> * Mobile-first
> * Touch-friendly inputs
> * No visual clutter
>
> Output Tailwind-based layout improvements.

---

## Phase 5 – Output & Polish

### Prompt 12: Print to PDF

> Implement print-to-PDF support for the Sudoku app.
>
> Requirements:
>
> * Print-friendly layout
> * Optional solution page
> * Uses browser print capabilities
>
> Output CSS and minimal supporting code.

---

### Prompt 13: Testing & Regression

> Review existing tests and improve coverage.
>
> Focus on:
>
> * Generator determinism
> * Solver correctness
> * Difficulty consistency
>
> Add regression tests for known seeds.

---

### Prompt 14: Documentation

> Help write project documentation explaining:
>
> * Deterministic Sudoku generation
> * URL-based seeds
> * Project architecture and design decisions
>
> Output Markdown suitable for README or docs.

---

## AI Collaboration Rules

Always remind the AI:

* Keep logic framework-agnostic
* Prefer pure functions
* Write tests alongside logic
* Determinism is non-negotiable
