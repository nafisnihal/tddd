// Local storage utilities for persisting DummyJSON changes

const STORAGE_KEY = "dummyjson_todos_local_changes";

// Get local changes from localStorage
export function getLocalChanges() {
  if (typeof window === "undefined") return {};

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch (error) {
    console.error("Failed to parse local changes:", error);
    return {};
  }
}

// Save local changes to localStorage
export function saveLocalChanges(changes) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(changes));
  } catch (error) {
    console.error("Failed to save local changes:", error);
  }
}

// Apply local changes to fetched todos
export function applyLocalChanges(todos) {
  const changes = getLocalChanges();

  return todos
    .map((todo) => {
      const todoId = todo.id.toString();

      // Apply local changes if they exist
      if (changes[todoId]) {
        return {
          ...todo,
          ...changes[todoId],
        };
      }

      return todo;
    })
    .filter((todo) => {
      // Filter out locally deleted todos
      const todoId = todo.id.toString();
      return !changes[todoId]?.deleted;
    });
}

// Add local todos that were created locally
export function addLocalTodos(todos) {
  const changes = getLocalChanges();
  const localTodos = [];

  // Find locally created todos (they have negative IDs)
  Object.entries(changes).forEach(([id, change]) => {
    if (parseInt(id) < 0 && !change.deleted) {
      localTodos.push({
        id: parseInt(id),
        ...change,
      });
    }
  });

  return [...localTodos, ...todos];
}

// Update a todo locally
export function updateTodoLocally(id, updates) {
  const changes = getLocalChanges();
  const todoId = id.toString();

  changes[todoId] = {
    ...changes[todoId],
    ...updates,
  };

  saveLocalChanges(changes);
}

// Delete a todo locally
export function deleteTodoLocally(id) {
  const changes = getLocalChanges();
  const todoId = id.toString();

  changes[todoId] = {
    ...changes[todoId],
    deleted: true,
  };

  saveLocalChanges(changes);
}

// Create a todo locally (with negative ID to avoid conflicts)
export function createTodoLocally(todoText) {
  const changes = getLocalChanges();

  // Find the lowest negative ID
  const existingIds = Object.keys(changes)
    .map((id) => parseInt(id))
    .filter((id) => id < 0);
  const newId = existingIds.length > 0 ? Math.min(...existingIds) - 1 : -1;

  const newTodo = {
    id: newId,
    todo: todoText,
    completed: false,
    userId: 1,
  };

  changes[newId.toString()] = newTodo;
  saveLocalChanges(changes);

  return newTodo;
}

// Clear all local changes (useful for reset)
export function clearLocalChanges() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}
