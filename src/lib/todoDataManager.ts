/**
 * The task interface
 */
export interface Todo {
	id: number;
	text: string;
	completed: boolean;
}

class TodoDataManager {
	private readonly STORAGE_KEY: string;

	constructor(key = 'todos') {
		this.STORAGE_KEY = key;
		console.debug('TodoDataManager created!');
	}

	/**
	 * Grabs all the todos from localstorage and returns them
	 * @returns A list of todos
	 */
	getTodos(): Todo[] {
		try {
			// Get the data
			const data = localStorage.getItem(this.STORAGE_KEY);

			// Return parsed data or an empty list, if we don't have
			// any data to return
			return data ? JSON.parse(data) : [];
		} catch (error) {
			console.error(`Error trying to load todos from localstorage: ${error}`);
			return [];
		}
	}

	/**
	 * Overwrites the current `STORAGE_KEY` with the new data
	 * inside of `todos`
	 * @param todos The list of todos to save
	 */
	saveTodos(todos: Todo[]): void {
		try {
			localStorage.setItem(this.STORAGE_KEY, JSON.stringify(todos));
		} catch (error) {
			console.error(`Error trying to save todos to localstorage: ${error}`);
		}
	}

	/**
	 * Adds the `todo` param to the current todo list from
	 * localstorage
	 * @see getTodos
	 * @param todo The todo to add
	 * @returns The updated todo list
	 */
	addTodo(todo: Omit<Todo, 'id'>): Todo[] {
		const todos = this.getTodos();

		const newTodo = {
			...todo,
			id: Date.now()
		};

		const updatedTodos = [...todos, newTodo] as Todo[];
		this.saveTodos(updatedTodos);
		return updatedTodos;
	}

	/**
	 * Modifes the data in the todo[`id`] and returns the new list
	 * before saving to localstorage
	 * @param id The todo to update
	 * @param updates The updated data
	 * @returns The updated todo list
	 */
	updateTodo(id: number, updates: Partial<Todo>): Todo[] {
		const todos = this.getTodos();

		const updatedTodos = todos.map((todo) =>
			// If the todo we're updating is this todo
			// Spread the old todo, followed by the updates
			todo.id === id ? { ...todo, ...updates } : todo
		);

		this.saveTodos(updatedTodos);
		return updatedTodos;
	}

	/**
	 * Deletes the todo with the given id, and then saves
	 * it to localstorage.
	 * @param id The todo to delete
	 * @returns The updated todo list
	 */
	deleteTodo(id: number): Todo[] {
		const todos = this.getTodos();
		const updatedTodos = todos.filter((todo) => todo.id !== id);

		this.saveTodos(updatedTodos);
		return updatedTodos;
	}
}

export const todoManager = new TodoDataManager();
