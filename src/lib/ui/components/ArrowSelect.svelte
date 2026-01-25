<script lang="ts">
	type Option<T = string> = {
		label: string;
		value: T;
	};

	const {
		options,
		value,
		onChange,
		disabled = false,
		class: className = ''
	} = $props<{
		options: Option[];
		value?: unknown;
		onChange?: (value: unknown) => void;
		disabled?: boolean;
		class?: string;
	}>();

	let index = $state(0);

	$effect(() => {
		if (value !== undefined) {
			const i = options.findIndex((o: Option) => o.value === value);
			if (i !== -1) index = i;
		}
	});

	const select = (dir: -1 | 1) => {
		if (disabled) return;
		index = Math.max(0, Math.min(options.length - 1, index + dir));
		onChange?.(options[index].value);
	};
</script>

<div class={`arrow-select ${className}`} data-disabled={disabled}>
	<button class="hidden">label_fallback</button>
	<button class="arrow" onclick={() => select(-1)}>‹</button>
	<div class="value">{options[index]?.label}</div>
	<button class="arrow" onclick={() => select(1)}>›</button>
</div>

<style>
	.arrow {
		all: unset;
		cursor: pointer;
		font-size: 1.5em;
		font-weight: bold;
		color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0 1rem;
		box-shadow: var(--box-shadow);
	}

	.value {
		min-width: 5em;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1 0;
	}
</style>
