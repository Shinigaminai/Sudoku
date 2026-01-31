import type { PageLoad } from './$types';

export const load: PageLoad = () => {
	return {
		seed: Math.floor(Math.random() * 1000)
	};
};
