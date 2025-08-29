// DummyJSON API functions with local storage persistence
import {
  addLocalTodos,
  applyLocalChanges,
  clearLocalChanges,
  createTodoLocally,
  deleteTodoLocally,
  updateTodoLocally,
} from "./local-storage";

// Export clearLocalChanges for external use
export { clearLocalChanges };

export async function fetchTodos(skip = 0, limit = 10) {
  const res = await fetch(
    `https://dummyjson.com/todos?limit=${limit}&skip=${skip}`
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch todos: ${res.statusText}`);
  }

  const response = await res.json();
  let todos = response.todos || [];

  // Apply local changes (updates, completion status)
  todos = applyLocalChanges(todos);

  // Add locally created todos
  todos = addLocalTodos(todos);

  return {
    data: todos,
    total: todos.length, // Use actual length after local changes
  };
}

export async function createTodo(todoText) {
  // Create locally instead of using DummyJSON
  // This ensures persistence across page refreshes
  return createTodoLocally(todoText);
}

export async function updateTodo(id, updates) {
  // Store changes locally instead of sending to DummyJSON
  // This ensures persistence across page refreshes
  updateTodoLocally(id, updates);

  // Return a simulated response
  return { id, ...updates };
}
export async function deleteTodo(id) {
  // Mark as deleted locally instead of sending to DummyJSON
  // This ensures persistence across page refreshes
  deleteTodoLocally(id);

  // Return a simulated response
  return { id, deleted: true };
}
