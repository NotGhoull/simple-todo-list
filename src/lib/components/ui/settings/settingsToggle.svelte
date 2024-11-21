<script lang="ts">
	import { Switch } from '../switch';
	import SettingsRow from './settingsRow.svelte';

	interface Props {
		title: String;
		description?: String;
		checked?: boolean;
	}

	let { title, description, checked = $bindable() }: Props = $props();
</script>

<SettingsRow layout="flex" {title} {description}>
	<Switch bind:checked />
</SettingsRow>
