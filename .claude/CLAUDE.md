# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start dev server (http://localhost:5173)
pnpm build        # Production build
pnpm test         # Run all tests once
pnpm test:unit    # Run tests in watch mode
pnpm lint         # Check formatting + ESLint
pnpm format       # Auto-format with Prettier
pnpm check        # TypeScript type checking
```

## Architecture

This is a SvelteKit + TypeScript Sudoku web app using Svelte 5 runes, Tailwind CSS v4, and Vitest.

### Core Design Principles

- **URL is the source of truth**: Puzzles are fully encoded in the URL as `{solutionHex}-{initMaskHex}`, making them reproducible and shareable
- **Deterministic generation**: Same seed always produces the same puzzle
- **Logic/UI separation**: All Sudoku logic is framework-agnostic in `src/lib/sudoku/`

### Key Modules (`src/lib/sudoku/`)

| Module | Purpose |
|--------|---------|
| `types/` | Domain types: `SudokuGrid`, `SudokuCell`, `SudokuValue` (0-9), `Difficulty` |
| `generator/` | `generateSolvedGrid(seed)` - deterministic grid generation using seeded RNG |
| `solver/` | `solveSudoku()`, `hasUniqueSolution()` - backtracking solver |
| `puzzle/` | `createPuzzle(solvedGrid, seed, difficulty)` - removes cells based on difficulty |
| `encoding/` | `encodePuzzle()` / `decodePuzzle()` - hex encoding for URL storage |
| `validation/` | Grid validation helpers |
| `utils/` | Grid utilities (`cloneGrid`, `createCell`) |

### Route Structure

- `/` - Main generator page: select difficulty, enter seed, generate puzzle
- `/sudoku/[puzzle]` - Puzzle view where `[puzzle]` is `{solutionHex}-{initMaskHex}`

### Data Flow

1. User selects difficulty and seed on `/`
2. `generateSolvedGrid(seed)` creates a complete valid Sudoku
3. `createPuzzle(solved, seed, difficulty)` masks cells based on `DifficultyPrefillMap`
4. `encodePuzzle()` converts to hex strings
5. Navigate to `/sudoku/{solutionHex}-{initMaskHex}`
6. Page load validates encoding with `isPuzzleEncoding()`, redirects to `/` if invalid

### Testing

Tests are colocated with source files (`*.test.ts`). Vitest runs in Node environment with global test APIs. Tests only include `src/lib/**` (core logic), not routes.

To run a single test file:
```bash
pnpm test:unit src/lib/sudoku/solver/sudokuSolver.test.ts
```

### Difficulty Levels

Defined in `DifficultyPrefillMap`:
- `solved`: 81 cells (no blanks)
- `easy`: 45 prefilled cells
- `medium`: 36 prefilled cells
- `hard`: 27 prefilled cells
- `expert`: 18 prefilled cells
