<script lang="ts">
	import { EmptyCellValue, type SudokuGrid } from '$lib/sudoku/types';
	import { onMount } from 'svelte';

	export let puzzleGrid: SudokuGrid;
	export let showSolution: boolean;

	// User-entered values (0 = empty)
	let userGrid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
	let cellRefs: HTMLElement[][] = Array.from({ length: 9 }, () => Array(9));

	function handleKeydown(e: KeyboardEvent, row: number, col: number) {
		const key = e.key;

		// ---- NAVIGATION ----
		let nextRow = row;
		let nextCol = col;

		switch (key) {
			case 'ArrowUp':
				nextRow = Math.max(0, row - 1);
				break;
			case 'ArrowDown':
				nextRow = Math.min(8, row + 1);
				break;
			case 'ArrowLeft':
				nextCol = Math.max(0, col - 1);
				break;
			case 'ArrowRight':
				nextCol = Math.min(8, col + 1);
				break;
			default:
				break;
		}

		if (nextRow !== row || nextCol !== col) {
			e.preventDefault();
			cellRefs[nextRow][nextCol]?.focus();
			return;
		}

		// ---- INPUT ----
		const cell = puzzleGrid[row][col];
		if (cell.fixed) return;

		if (key >= '1' && key <= '9') {
			userGrid[row][col] = Number(key);
		}

		if (key === 'Backspace' || key === 'Delete' || key === '0') {
			userGrid[row][col] = 0;
		}
	}

	function isCellError(row: number, col: number) {
		const usrValue = userGrid[row][col];
		const correctValue = puzzleGrid[row][col].value;
		if (usrValue === EmptyCellValue) return false;
		return usrValue !== correctValue;
	}

	onMount(() => {
		for (let r = 0; r < 9; r++) {
			for (let c = 0; c < 9; c++) {
				if (!puzzleGrid[r][c].fixed) {
					cellRefs[r][c]?.focus();
					return;
				}
			}
		}
	});
</script>

<div class="aspect-square h-full max-h-200 max-w-full contain-size">
	<div class="sudoku-grid" class:solved={showSolution}>
		{#each Array(9) as _, blockIndex}
			<div class="block">
				{#each Array(9) as _, cellIndex}
					{@const row = Math.floor(blockIndex / 3) * 3 + Math.floor(cellIndex / 3)}
					{@const col = (blockIndex % 3) * 3 + (cellIndex % 3)}
					{@const cell = puzzleGrid[row][col]}

					<div
						bind:this={cellRefs[row][col]}
						class="cell"
						class:cell--error={isCellError(row, col)}
						data-fixed={cell.fixed}
						tabindex="0"
						role="gridcell"
						onclick={(e) => {
							e.preventDefault();
							(e.currentTarget as HTMLElement).focus();
						}}
						onkeydown={(e) => handleKeydown(e, row, col)}
					>
						{#if cell.fixed || showSolution}
							{cell.value}
						{:else if userGrid[row][col] !== 0}
							{userGrid[row][col]}
						{/if}
					</div>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.sudoku-grid {
		--cell-bg: #ffffff;
		--cell-fixed-bg: #f1f5f9;
		--cell-selected-bg: var(--primary-hover);
		--cell-border-color: rgb(53, 52, 51);
		--cell-border-width: 1px;
		--block-border-color: rgb(39, 38, 37);
		--block-border-width: 1px;

		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		/* Scale grid to fit container but limit size */
		width: 100%;
		aspect-ratio: 1 / 1;

		background-color: var(--block-border-color);
		border: calc(var(--block-border-width) * 2) solid var(--block-border-color);

		container-type: inline-size;
	}

	.block {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: repeat(3, 1fr);

		border: var(--block-border-width) solid var(--block-border-color);
		background-color: var(--cell-border-color);
	}

	.cell {
		display: flex;
		align-items: center;
		justify-content: center;

		aspect-ratio: 1 / 1;
		box-sizing: border-box;
		padding: 0.25rem;

		background-color: var(--cell-bg);
		border: var(--cell-border-width) solid var(--cell-border-color);

		color: var(--text);
		font-size: 5cqw;
		line-height: 1;

		user-select: none;
		cursor: default;

		transition: background-color 0.15s ease;
	}

	.cell[data-fixed='true'] {
		font-weight: bold;
		background-color: var(--cell-fixed-bg);
	}

	.cell:focus,
	.cell:focus-visible {
		outline: none;
		box-shadow:
			0 0 0 2px lightgrey,
			0 0 3px 2px darkslategray,
			var(--box-shadow-md);
		border-radius: 1px;
		z-index: 1;
	}

	.cell[data-fixed='false']:hover,
	.cell[data-fixed='false']:focus {
		background-color: var(--cell-selected-bg);
	}
	.cell[data-fixed='true']:hover,
	.cell[data-fixed='true']:focus {
		background-color: var(--disabled);
	}

	.solved .cell--error {
		background-color: var(--error);
	}
</style>
