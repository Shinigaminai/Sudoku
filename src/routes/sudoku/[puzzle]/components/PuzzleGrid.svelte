<script lang="ts">
	import { EmptyCellValue, type SudokuGrid } from '$lib/sudoku/types';

	export let puzzleGrid: SudokuGrid;
	export let showSolution: boolean;

	// User-entered values (0 = empty)
	let userGrid: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0));
	let selectedCell = { row: -1, column: -1 };

	function handleKeydown(e: KeyboardEvent, row: number, col: number) {
		console.log(e.code);

		const cell = puzzleGrid[row][col];

		if (cell.fixed) return;

		if (e.key >= '1' && e.key <= '9') {
			userGrid[row][col] = Number(e.key);
		}

		if (e.key === 'Backspace' || e.key === 'Delete' || e.key === '0') {
			userGrid[row][col] = 0;
		}
	}

	function isCellError(row: number, col: number) {
		const usrValue = userGrid[row][col];
		const correctValue = puzzleGrid[row][col].value;
		if (usrValue === EmptyCellValue) return false;
		return usrValue !== correctValue;
	}
</script>

<div class="aspect-square h-full max-h-200 max-w-full contain-size">
	<div class="sudoku-grid {showSolution ? 'solved' : ''}">
		{#each puzzleGrid as row, rowIndex}
			{#each row as cell, colIndex}
				<div
					class="cell"
					class:cell--error={isCellError(rowIndex, colIndex)}
					role="gridcell"
					tabindex="0"
					onclick={(e) => {
						(e.currentTarget as HTMLElement).focus();
					}}
					onkeydown={(e) => handleKeydown(e, rowIndex, colIndex)}
					data-fixed={cell.fixed}
					data-row={rowIndex}
					data-col={colIndex}
				>
					{#if cell.fixed || showSolution}
						{cell.value}
					{:else if userGrid[rowIndex][colIndex] !== 0}
						{userGrid[rowIndex][colIndex]}
					{/if}
				</div>
			{/each}
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
		--block-border-width: 2px;

		display: grid;
		grid-template-columns: repeat(9, 1fr);
		grid-auto-rows: 1fr;

		/* Scale grid to fit container but limit size */
		width: 100%;
		aspect-ratio: 1 / 1;

		background-color: var(--block-border-color);
		border: var(--block-border-width) solid var(--block-border-color);

		container-type: inline-size;
	}

	.cell {
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		padding: 0.25rem;

		border: var(--cell-border-width) solid var(--cell-border-color);
		user-select: none;
		cursor: default;

		aspect-ratio: 1 / 1;

		text-align: center;
		line-height: 1;
		color: var(--text);
		background-color: var(--cell-bg);
		transition: background-color 0.15s ease;

		/* Scale text relative to grid width */
		font-size: 5cqw;
	}

	.cell[data-fixed='true'] {
		font-weight: bold;
		background-color: var(--cell-fixed-bg);
	}

	.cell[data-row='3'],
	.cell[data-row='6'] {
		border-top: var(--block-border-width) solid var(--block-border-color);
	}

	.cell[data-col='3'],
	.cell[data-col='6'] {
		border-left: var(--block-border-width) solid var(--block-border-color);
	}

	.cell[data-fixed='false']:focus {
		background-color: var(--cell-selected-bg);
		box-shadow: var(--box-shadow-active);
		z-index: 1;
	}
	.cell[data-fixed='true']:focus {
		background-color: var(--disabled);
		box-shadow: var(--box-shadow-active);
		z-index: 1;
	}
	.cell[data-fixed='false']:hover {
		background-color: var(--cell-selected-bg);
	}
	.cell[data-fixed='true']:hover {
		background-color: var(--disabled);
	}

	.solved > .cell--error {
		background-color: var(--error);
	}
</style>
