// src/routes/sudoku/[puzzle]/+page.ts
import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { isPuzzleEncoding } from '$lib/sudoku/encoding/puzzleEncoding';

export const load: PageLoad = ({ params }) => {
	const puzzle = params.puzzle;

	if (!isPuzzleEncoding(puzzle)) {
		throw redirect(302, '/'); // invalid puzzle → go to generator page
	}

	return { puzzle };
};
