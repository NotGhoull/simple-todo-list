<script lang="ts">
	import type { Selected } from 'bits-ui';
	import { Button } from '../button';
	import { Popover, PopoverTrigger } from '../popover';
	import PopoverContent from '../popover/popover-content.svelte';
	import SettingsSelector from './settingsSelector.svelte';
	import { Settings2Icon } from 'lucide-svelte';
	import SettingsToggle from './settingsToggle.svelte';
	import { settingsManager, type Settings } from '$lib/settingsManager';
	import { setMode } from 'mode-watcher';

	let settings = $state(settingsManager.get() as Settings);
	$inspect(settings);

	const modeOptions = [
		{ value: 'system', label: 'System' },
		{ value: 'dark', label: 'Dark' },
		{ value: 'light', label: 'Light' }
	];

	let selectedMode = $state<Selected<string> | undefined>(
		modeOptions.find((option) => option.value === settings.theme)
	);

	let allowRotation = $state(settings.allowRotation);

	//! DO NOT LINK ALL THESE EFFECTS INTO ONE
	//  It errors out and breaks everything.
	$effect(() => {
		if (selectedMode?.value == settings.theme || !selectedMode) {
			return;
		}
		settingsManager.set('theme', selectedMode.value);
		settings = settingsManager.get() as Settings;
		//@ts-ignore
		// We can ignore this, since we know it's value is a valid one.
		setMode(selectedMode.value);
	});

	$effect(() => {
		if (allowRotation == settings.allowRotation) {
			return;
		}
		settingsManager.set('allowRotation', allowRotation);
		settings = settingsManager.get() as Settings;
	});
</script>

<Popover>
	<PopoverTrigger>
		<Button size="icon" class="transition-all hover:scale-105"
			><Settings2Icon class="h-4 w-4" /></Button
		>
	</PopoverTrigger>
	<PopoverContent class="w-auto">
		<h1 class="text-xl font-bold">Settings</h1>
		<SettingsSelector bind:selected={selectedMode} options={modeOptions} />
		<SettingsToggle
			title="Allow rotation"
			description="Lets the screen rotate whenever a button is clicked"
			bind:checked={allowRotation}
		/>
	</PopoverContent>
</Popover>
