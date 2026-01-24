<script lang="ts">
	import { encodePuzzle, createPuzzle, generateSolvedGrid } from '$lib/sudoku/';
	import type { Difficulty } from '$lib/sudoku/types/sudoku';
	import { goto } from '$app/navigation';

	export let data: { seed: number };
	let seed = data.seed;
	let difficulty: Difficulty = 'medium';

	function handleGenerate() {
		const solved = generateSolvedGrid(seed);
		const puzzle = createPuzzle(solved, seed, difficulty);
		const { solutionHex, initMaskHex } = encodePuzzle(puzzle);
		goto(`/sudoku/${solutionHex}-${initMaskHex}`);
	}
</script>

<div class="mt-12 flex flex-col items-center space-y-6">
	<h1 class="text-3xl font-bold">Sudoku Generator</h1>

	<div class="flex flex-col space-y-2">
		<label>
			Difficulty:
			<select bind:value={difficulty} class="rounded border px-2 py-1">
				<option value="easy">Easy</option>
				<option value="medium">Medium</option>
				<option value="hard">Hard</option>
				<option value="expert">Expert</option>
			</select>
		</label>

		<label>
			Seed (optional):
			<input type="number" bind:value={seed} class="rounded border px-2 py-1" />
		</label>
	</div>

	<button
		class="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
		on:click={handleGenerate}
	>
		Generate Sudoku
	</button>
</div>
