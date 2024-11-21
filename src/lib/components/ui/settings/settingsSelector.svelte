<script lang="ts">
	import type { Selected } from 'bits-ui';
	import { SelectTrigger, SelectValue, SelectContent, SelectItem, Select } from '../select';
	import SettingsRow from './settingsRow.svelte';

	interface Props {
		selected?: Selected<String>;
		options: { value: String; label: String }[];
	}

	let { selected = $bindable(), options }: Props = $props();
</script>

<SettingsRow title="Mode" description="The mode of the website">
	<Select  bind:selected>
		<SelectTrigger>
			<SelectValue placeholder="Mode" />
		</SelectTrigger>
		<SelectContent>
			{#each options as option (option.value)}
				<SelectItem value={option.value}>{option.label}</SelectItem>
			{/each}
		</SelectContent>
	</Select>
</SettingsRow>
