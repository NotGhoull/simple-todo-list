<script lang="ts">
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';
	let { children } = $props();
</script>

<ModeWatcher />
<div class="flex h-full w-full justify-center align-middle">
	{@render children()}
</div>
