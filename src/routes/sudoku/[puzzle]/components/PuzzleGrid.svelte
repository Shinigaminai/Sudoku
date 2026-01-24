<script lang="ts">
	import type { SudokuGrid } from '$lib/sudoku/types';
	export let puzzleGrid: SudokuGrid;
</script>

<div class="grid grid-cols-9 gap-0.5">
	{#each puzzleGrid as row}
		{#each row as cell}
			<div
				class="h-10 w-10 border text-center font-bold"
				class:bg-gray-200={cell.fixed}
				class:bg-white={!cell.fixed}
			>
				{cell.value !== 0 ? cell.value : ''}
			</div>
		{/each}
	{/each}
</div>
