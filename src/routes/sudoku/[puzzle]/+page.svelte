<script lang="ts">
	import type { PageData } from './$types';
	import PuzzleGrid from './components/PuzzleGrid.svelte';
	import { decodePuzzle } from '$lib/sudoku/encoding/puzzleEncoding';
	import type { SudokuGrid } from '$lib/sudoku/types/sudoku';

	// `data` comes from +page.ts load function
	export let data: PageData;

	// Decode the puzzle directly — data.puzzle is guaranteed to exist and be valid
	const [solutionHex, initMaskHex] = data.puzzle.split('-');
	const puzzleGrid: SudokuGrid = decodePuzzle(solutionHex, initMaskHex);
</script>

<div class="page">
	<div class="controls">
		<a href="/" class="btn btn--primary">Home</a>
		<button class="btn btn--secondary">Share</button>
		<button class="btn btn--negative">Solve</button>
	</div>

	<div class="content">
		<PuzzleGrid {puzzleGrid} />
	</div>
</div>

<style>
	.page {
		display: flex;
		flex-direction: column;
		height: 100%; /* take all available space from body */
	}

	.controls {
		padding: 1rem;
		display: flex;
		gap: 1rem;
		justify-content: center;
	}

	.content {
		flex: 1; /* take remaining space */
		min-height: 0; /* allow shrinking in flex context */
		display: flex;
		align-items: center; /* vertical centering if space allows */
		justify-content: center; /* horizontal centering */
		padding: 1em;
	}
</style>
