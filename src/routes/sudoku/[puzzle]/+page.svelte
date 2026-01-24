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

<div class="mt-8 flex flex-col items-center space-y-4">
	<!-- Sudoku grid -->
	<PuzzleGrid {puzzleGrid} />

	<!-- Controls -->
	<div class="mt-4 flex gap-4">
		<button class="rounded bg-blue-500 px-4 py-2 text-white" on:click={() => alert('Solve!')}>
			Solve
		</button>
		<button
			class="rounded bg-green-500 px-4 py-2 text-white"
			on:click={() => navigator.clipboard.writeText(window.location.href)}
		>
			Share
		</button>
		<a href="/" class="rounded bg-gray-500 px-4 py-2 text-white">Home</a>
	</div>
</div>

<style>
	/* Optional: basic centering and spacing */
	.grid-container {
		display: grid;
		gap: 0.5rem;
	}
</style>
