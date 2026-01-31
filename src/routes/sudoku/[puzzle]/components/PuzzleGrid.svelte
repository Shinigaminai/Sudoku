<script lang="ts">
	import { EmptyCellValue, type SudokuGrid } from '$lib/sudoku/types';
	import { onMount } from 'svelte';
	import {
		calculateDragValue,
		isTapGesture,
		getNextTapValue,
		type DragState
	} from '$lib/ui/utils/dragInput';
	import { getNavigationDirection, getNextCell, parseInputKey } from '$lib/ui/utils/keyboardInput';

	interface Props {
		puzzleGrid: SudokuGrid;
		showSolution: boolean;
	}

	const { puzzleGrid, showSolution }: Props = $props();

	// User-entered values (0 = empty)
	let userGrid = $state(Array.from({ length: 9 }, () => Array(9).fill(0)));
	let cellRefs = $state<HTMLElement[][]>(Array.from({ length: 9 }, () => Array(9)));

	// Drag state
	let dragging = $state(false);
	let dragState = $state<DragState | null>(null);
	let activeRow = $state(-1);
	let activeCol = $state(-1);
	let lastDragValue = $state(-1);
	let hasDragged = $state(false);

	function handleKeydown(e: KeyboardEvent, row: number, col: number) {
		const direction = getNavigationDirection(e.key);
		if (direction) {
			e.preventDefault();
			const next = getNextCell(row, col, direction);
			cellRefs[next.row][next.col]?.focus();
			return;
		}

		if (puzzleGrid[row][col].fixed) return;

		const value = parseInputKey(e.key);
		if (value !== null) {
			userGrid[row][col] = value;
		}
	}

	function startDrag(e: PointerEvent, row: number, col: number) {
		const cell = puzzleGrid[row][col];
		if (cell.fixed) return;

		e.preventDefault();
		(e.currentTarget as HTMLElement).focus();

		dragging = true;
		hasDragged = false;
		activeRow = row;
		activeCol = col;

		const startValue = userGrid[row][col] ?? 0;
		dragState = {
			startX: e.clientX,
			startY: e.clientY,
			startValue,
			startTime: Date.now()
		};
		lastDragValue = startValue;

		window.addEventListener('pointermove', onDrag);
		window.addEventListener('pointerup', endDrag);
	}

	function onDrag(e: PointerEvent) {
		if (!dragging || !dragState) return;

		const result = calculateDragValue(e.clientX, e.clientY, dragState);
		hasDragged = result.hasDragged || hasDragged;

		if (result.value !== lastDragValue) {
			lastDragValue = result.value;
			triggerPulse(activeRow, activeCol);
		}
		userGrid[activeRow][activeCol] = result.value;
	}

	function endDrag() {
		if (!dragState) return;

		const duration = Date.now() - dragState.startTime;
		const row = activeRow;
		const col = activeCol;

		dragging = false;
		dragState = null;

		window.removeEventListener('pointermove', onDrag);
		window.removeEventListener('pointerup', endDrag);

		if (isTapGesture(hasDragged, duration)) {
			const currentValue = userGrid[row][col];
			userGrid[row][col] = getNextTapValue(currentValue);
			triggerPulse(row, col);
		}

		activeRow = -1;
		activeCol = -1;
	}

	/**
	 * Triggers a pulse animation on the cell at the given position.
	 */
	function triggerPulse(row: number, col: number) {
		const cell = cellRefs[row][col];
		if (!cell) return;

		cell.classList.remove('pulse');
		void cell.offsetWidth;
		cell.classList.add('pulse');
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
		{#each Array.from({ length: 9 }, (_, i) => i) as blockIndex (blockIndex)}
			<div class="block">
				{#each Array.from({ length: 9 }, (_, i) => i) as cellIndex (cellIndex)}
					{@const row = Math.floor(blockIndex / 3) * 3 + Math.floor(cellIndex / 3)}
					{@const col = (blockIndex % 3) * 3 + (cellIndex % 3)}
					{@const cell = puzzleGrid[row][col]}

					<div
						bind:this={cellRefs[row][col]}
						class="cell"
						class:cell--error={isCellError(row, col)}
						class:is-dragging={dragging && row === activeRow && col === activeCol}
						data-fixed={cell.fixed}
						tabindex="0"
						role="gridcell"
						onclick={(e) => {
							e.preventDefault();
							(e.currentTarget as HTMLElement).focus();
						}}
						onkeydown={(e) => handleKeydown(e, row, col)}
						onpointerdown={(e) => startDrag(e, row, col)}
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

		touch-action: none;
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

	.cell.is-dragging {
		background-color: var(--cell-selected-bg);
		cursor: grabbing;
	}

	/* Applied dynamically via JavaScript - :global prevents unused CSS warning */
	.cell:global(.pulse) {
		animation: pulse-scale 0.15s ease-out;
	}

	@keyframes pulse-scale {
		0% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.08);
		}
		100% {
			transform: scale(1);
		}
	}

	.solved .cell--error {
		background-color: var(--error);
	}
</style>
