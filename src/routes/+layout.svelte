<script lang="ts">
	import '$lib/i18n';

	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	const languages = [
		{ code: 'en', name: 'English' },
		{ code: 'de', name: 'Deutsch' }
	];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Sudoku</title>
	<meta property="og:title" content="Sudoku" />
	<meta property="og:description" content="Generate and play Sudoku puzzles!" />
	<meta property="og:image" content="/og-image.png" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:image" content="/og-image.png" />
</svelte:head>

<div>
	<label for="language"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			height="24px"
			viewBox="0 -960 960 960"
			width="24px"
			fill="#e3e3e3"
			><path
				d="m476-80 182-480h84L924-80h-84l-43-122H603L560-80h-84ZM160-200l-56-56 202-202q-35-35-63.5-80T190-640h84q20 39 40 68t48 58q33-33 68.5-92.5T484-720H40v-80h280v-80h80v80h280v80H564q-21 72-63 148t-83 116l96 98-30 82-122-125-202 201Zm468-72h144l-72-204-72 204Z"
			/></svg
		></label
	>
	<select name="language" id="language">
		{#each languages as { code, name }}
			<option value={code}>{name}</option>
		{/each}
	</select>
</div>

{@render children()}
