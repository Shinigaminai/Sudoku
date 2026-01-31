<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { createPuzzle, encodePuzzle, generateSolvedGrid } from '$lib/sudoku/';
	import type { Difficulty } from '$lib/sudoku/types/sudoku';
	import ArrowSelect from '$lib/ui/components/ArrowSelect.svelte';

	let seed = $state(Math.floor(Math.random() * 1000));

	function handleGenerate() {
		const solved = generateSolvedGrid(seed);
		const puzzle = createPuzzle(solved, seed, difficulty);
		const { solutionB64, initMaskB64 } = encodePuzzle(puzzle);
		goto(resolve(`/sudoku/${solutionB64}:${initMaskB64}`));
	}

	const difficulties = [
		{ label: 'Easy', value: 'easy' },
		{ label: 'Medium', value: 'medium' },
		{ label: 'Hard', value: 'hard' },
		{ label: 'Expert', value: 'expert' }
	];

	let difficulty: Difficulty = $state('easy');
</script>

<div class="mt-12 flex flex-col items-center space-y-10 px-6">
	<h1 class="text-3xl font-bold">Sudoku Generator</h1>

	<div class="grid grid-cols-2 items-baseline gap-x-2 gap-y-4">
		<label>
			<div class="label-settings">Difficulty:</div>
			<ArrowSelect
				options={difficulties}
				value={difficulty}
				onChange={(v) => (difficulty = v as Difficulty)}
				class="btn--secondary"
			/>
		</label>

		<label>
			<div class="label-settings">Seed (optional):</div>
			<input type="number" bind:value={seed} class="rounded border px-2 py-1" />
		</label>
	</div>

	<button class="btn" onclick={handleGenerate}> Generate Sudoku </button>
</div>

<style>
	label {
		display: contents;
	}
</style>
