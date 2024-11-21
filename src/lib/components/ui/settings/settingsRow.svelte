<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Label } from '../label';

	interface Props {
		title: String;
		description?: String;
		extra_class?: String;
		layout?: 'default' | 'flex';
		children?: Snippet;
	}

	const { title, description, extra_class, layout = 'default', children }: Props = $props();
</script>

<!-- -->
{#if layout == 'flex'}
	{@render flexLayout()}
{:else}
	{@render defaultLayout()}
{/if}

{#snippet defaultLayout()}
	<div class={`m-4 grid gap-2 rounded-md border-2 border-solid p-4 ${extra_class}`}>
		{@render renderText()}
		{@render renderChildren()}
	</div>
{/snippet}

{#snippet flexLayout()}
	<div class={`m-4 flex flex-row gap-2 rounded-md border-2 border-solid p-4`}>
		{@render renderChildren()}

		{@render renderText()}
	</div>
{/snippet}

{#snippet renderChildren()}
	<div class="flex items-center gap-4 pr-2">
		<!-- <slot /> -->
		{@render children?.()}
	</div>
{/snippet}

{#snippet renderText()}
	<div class="flex flex-col space-y-0.5">
		<Label class="text-base">{title}</Label>
		{#if description}
			<p class="text-sm text-muted-foreground">{description}</p>
		{/if}
	</div>
{/snippet}
