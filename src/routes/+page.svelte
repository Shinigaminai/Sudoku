<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPuzzle, encodePuzzle, generateSolvedGrid } from '$lib/sudoku/';
	import type { Difficulty } from '$lib/sudoku/types/sudoku';
	import ArrowSelect from '$lib/ui/components/ArrowSelect.svelte';

	let { seed }: { seed: number } = $props();

	function handleGenerate() {
		const solved = generateSolvedGrid(seed);
		const puzzle = createPuzzle(solved, seed, difficulty);
		const { solutionHex, initMaskHex } = encodePuzzle(puzzle);
		goto(`/sudoku/${solutionHex}-${initMaskHex}`);
	}

	const difficulties = [
		{ label: 'Easy', value: 'easy' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Hard', value: 'hard' },
		{ label: 'Expert', value: 'expert' }
	];

	let difficulty: Difficulty = $state('easy');
</script>

<div class="mt-12 flex flex-col items-center space-y-6">
	<h1 class="text-3xl font-bold">Sudoku Generator</h1>

	<div class="flex flex-col space-y-2">
		<label>
			Difficulty:
			<ArrowSelect
				options={difficulties}
				value={difficulty}
				onChange={(v) => (difficulty = v as Difficulty)}
				class="btn--secondary"
			/>
		</label>

		<label>
			Seed (optional):
			<input type="number" bind:value={seed} class="rounded border px-2 py-1" />
		</label>
	</div>

	<button class="btn" onclick={handleGenerate}> Generate Sudoku </button>
</div>
