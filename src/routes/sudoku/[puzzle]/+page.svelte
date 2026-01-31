<script lang="ts">
	import type { PageData } from './$types';
	import PuzzleGrid from './components/PuzzleGrid.svelte';
	import { decodePuzzle } from '$lib/sudoku';
	import { resolve } from '$app/paths';
	import type { SudokuGrid } from '$lib/sudoku/types/sudoku';

	const { data } = $props<{ data: PageData }>();

	const puzzle = (() => data.puzzle)();

	const [solutionHex, initMaskHex] = puzzle.split('-');
	const puzzleGrid: SudokuGrid = decodePuzzle(solutionHex, initMaskHex);

	let showSolution = $state(false);

	const solvePuzzle = () => {
		showSolution = !showSolution;
	};

	const copyToClipboard = async (url: string) => {
		try {
			await navigator.clipboard.writeText(url);
			alert('Link copied to clipboard!');
		} catch (err) {
			console.error('Clipboard copy failed:', err);
			alert('Failed to copy link');
		}
	};

	const handleShareClicked = async () => {
		const shareUrl = window.location.href;

		if (navigator.share) {
			try {
				await navigator.share({
					title: document.title,
					url: shareUrl
				});
			} catch (err) {
				// User cancelled or share failed - fall back to clipboard
				if ((err as Error).name !== 'AbortError') {
					await copyToClipboard(shareUrl);
				}
			}
		} else {
			await copyToClipboard(shareUrl);
		}
	};
</script>

<div class="page">
	<div class="controls">
		<a href={resolve('/')} class="btn btn--primary">Home</a>
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
