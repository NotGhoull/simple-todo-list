<script lang="ts">
	// Import Shadcn/UI components
	import { slide } from 'svelte/transition';
	import { CheckCircleIcon, Github, GithubIcon, PlusCircleIcon } from 'lucide-svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Tabs, TabsTrigger } from '$lib/components/ui/tabs';
	import TabsList from '$lib/components/ui/tabs/tabs-list.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';

	// Todo specific stuff
	import { todoManager, type Todo } from '$lib/todoDataManager';
	import type { CustomEventHandler } from 'bits-ui';

	// State variables

	/**
	 * The task text used by {@link createNewTask}
	 */
	let newTaskText = $state('');

	/**
	 * Holds all the todos.
	 */
	let todos: Todo[] = $state(todoManager.getTodos());
	/**
	 * The currently active filter. This can be:
	 * - All
	 * - Incomplete
	 * - Complete
	 */
	let filterState: 'all' | 'incomplete' | 'complete' = $state('all');

	// Derived state

	/**
	 * the amount of items that aren't completed
	 */
	let itemsLeft = $derived(todos.filter((task) => !task.completed));

	/**
	 * Filters the todo list based off of `filterState`
	 * @see {@link filterState}
	 */
	let filteredTodos = $derived.by(() => {
		return filterState === 'all'
			? todos
			: filterState === 'incomplete'
				? todos.filter((todo) => !todo.completed)
				: todos.filter((todo) => todo.completed);
	});

	// Helper functions

	/**
	 * Creates a new task and adds it to `todos`
	 * uses the text from `newTaskText` as its
	 * text input
	 */
	function createNewTask() {
		todos = todoManager.addTodo({ text: newTaskText, completed: false });
		newTaskText = '';
	}

	/**
	 * Deletes the task from `todos` with the specified `id`
	 * @param id - The task to delete
	 */
	function deleteTask(id: number) {
		todos = todoManager.deleteTodo(id);
	}

	/**
	 * Deletes all completed tasks inside of `todos`
	 */
	function deleteCompletedTasks() {
		todos = todos.filter((todo) => !todo.completed);
	}

	/**
	 * Handles keydown events for the page.
	 * @param event - The key event
	 */
	function handleKeydown(event: KeyboardEvent) {
		// Get our text input
		const textInput = document.getElementById('INPUT_CREATE_TASK') as HTMLInputElement;

		// If we're entering (assuming it's in the field)
		// We create a new task
		if (event.key === 'Enter' && newTaskText) createNewTask();
		// If it's escape, we drop the focus
		else if (event.key === 'Escape') textInput?.blur();
		// Otherwise, we set the focus to the text field.
		else textInput?.focus();
	}

	function updateTodoCompletion(
		id: number,
		state: boolean,
		event: CustomEventHandler<MouseEvent, HTMLButtonElement>
	): void {
		// For whatever reason, this gives us the inverted state.
		// which is why we do this weird conversion
		const activeState =
			event.detail.currentTarget.attributes[0].value == 'unchecked' ? 'checked' : 'unchecked';

		todos = todoManager.updateTodo(id, { completed: state });
	}
</script>

<svelte:window on:keydown={handleKeydown} />

<div class="flex min-h-screen w-full max-w-2xl items-center justify-center">
	<Card class="m-4 w-full transition hover:shadow-lg">
		<CardHeader>
			<div transition:slide class="space-y-2 text-center">
				<CardTitle class="text-2xl font-bold">Simple Tasks</CardTitle>
				<div class="flex items-center justify-center gap-4 text-sm text-muted-foreground">
					<CardDescription>Made by Ghoul</CardDescription>
					<nav class="flex items-center gap-2">
						<a
							href="https://github.com/NotGhoull/simple-todo-list/"
							class="flex cursor-pointer flex-row gap-2 hover:text-primary hover:underline"
						>
							<GithubIcon />
							See on GitHub
						</a>
					</nav>
				</div>
			</div>
		</CardHeader>

		<CardContent class="space-y-6">
			<!-- Add todo section -->
			<div class="flex space-x-2" in:slide={{ duration: 400, delay: 200 }}>
				<Input
					bind:value={newTaskText}
					placeholder="Add new task..."
					class="flex-1 focus:scale-[1.02]"
					id="INPUT_CREATE_TASK"
				/>
				<Button on:click={createNewTask} class="flex items-center gap-2 hover:scale-105">
					<PlusCircleIcon class="h-4 w-4" /> Add
				</Button>
			</div>

			<!-- Filter tabs -->
			<Tabs bind:value={filterState} class="w-full">
				<TabsList class="grid w-full grid-cols-3">
					{#each ['all', 'incomplete', 'complete'] as state}
						<TabsTrigger value={state} class="hover:scale-105"
							>{state.charAt(0).toUpperCase() + state.slice(1)}</TabsTrigger
						>
					{/each}
				</TabsList>
			</Tabs>

			<!-- Todos list -->
			<div class="max-h-l h-60 space-y-3 overflow-scroll" transition:slide|global>
				{#if filteredTodos.length === 0}
					<div
						class="flex h-full flex-col items-center justify-center space-x-4 p-4"
						transition:slide
					>
						<CheckCircleIcon class="mb-2 h-16 w-16 animate-bounce" />
						<p class="animate-fade-in">Hey, you're all caught up!</p>
						<small class="animate-fade-in-delayed">Why not add some more?</small>
					</div>
				{:else}
					{#each filteredTodos as todo (todo.id)}
						<div
							class="flex items-center space-x-4 p-4 transition hover:bg-muted/50"
							transition:slide
						>
							<Checkbox
								on:click={(event) => updateTodoCompletion(todo.id, !todo.completed, event)}
								bind:checked={todo.completed}
								class="h-5 w-5 hover:scale-110"
							/>
							<span
								class="flex-1 font-bold {todo.completed
									? 'text-muted-foreground line-through'
									: ''}"
							>
								{todo.text}
							</span>

							<Button
								variant="outline"
								size="sm"
								class="hover:scale-105 hover:bg-destructive"
								on:click={() => deleteTask(todo.id)}
							>
								Delete
							</Button>
						</div>
					{/each}
				{/if}
			</div>

			<!-- Summary -->
			<div
				class="flex items-center justify-between border-t pt-4 text-sm text-muted-foreground"
				transition:slide
			>
				<span class="scale-100 transition-all">
					{itemsLeft.length}
					{itemsLeft.length === 1 ? 'item' : 'items'} left
				</span>
				<Button
					on:click={deleteCompletedTasks}
					variant="ghost"
					size="sm"
					class="hover:translate-y-[-2px] hover:rotate-[-2deg] hover:scale-110"
				>
					Remove completed
				</Button>
			</div>
		</CardContent>
	</Card>
</div>

<!-- Styling -->
<style>
	@keyframes fadeIn {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.animate-fade-in {
		animation: fadeIn 0.5s ease-out 0.2s both;
	}
	.animate-fade-in-delayed {
		animation: fadeIn 0.5s ease-out 0.5s both;
	}
</style>
