<script lang="ts">
	import type { PageData } from './$types';
	import PuzzleGrid from './components/PuzzleGrid.svelte';
	import { decodePuzzle, decodeSolutionGrid } from '$lib/sudoku';
	import type { SudokuGrid } from '$lib/sudoku/types/sudoku';

	const { data } = $props<{ data: PageData }>();

	const puzzle = (() => data.puzzle)();

	const [solutionHex, initMaskHex] = puzzle.split('-');
	const puzzleGrid: SudokuGrid = decodePuzzle(solutionHex, initMaskHex);

	let showSolution = $state(false);

	const solvePuzzle = () => {
		showSolution = !showSolution;
	};

	const handleShareClicked = async () => {
		const shareUrl = window.location.href;

		// If Web Share API is available (mostly mobile)
		if (navigator.share) {
			navigator
				.share({
					title: document.title,
					url: shareUrl
				})
				.catch(() => {});
			console.log('opening system share menu');
		} else {
			navigator.clipboard
				.writeText(shareUrl)
				.then(() => alert('Link copied to clipboard!'))
				.catch((err) => {
					console.error('Clipboard copy failed:', err);
					alert('Failed to copy link');
				});
		}
	};
</script>

<div class="page">
	<div class="controls">
		<a href="/" class="btn btn--primary">Home</a>
		<button class="btn btn--secondary" onclick={handleShareClicked}>Share</button>
		<button class="btn btn--negative" onclick={solvePuzzle}> Solve </button>
	</div>

	<div class="content">
		<PuzzleGrid {puzzleGrid} {showSolution} />
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
