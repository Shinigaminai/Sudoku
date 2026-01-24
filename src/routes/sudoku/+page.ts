import type { PageLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageLoad = () => {
    // If someone opens /sudoku directly, redirect to homepage
    throw redirect(302, '/');
};
