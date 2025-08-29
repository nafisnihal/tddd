// Utility functions for todo filtering and pagination

export function filterTodosByStatus(todos, status) {
  if (status === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  if (status === "pending") {
    return todos.filter((todo) => !todo.completed);
  }
  return todos; // "all" case
}

export function paginateTodos(todos, page, perPage) {
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  return todos.slice(startIndex, endIndex);
}

export function calculateTotalPages(totalItems, perPage) {
  return Math.max(1, Math.ceil(totalItems / perPage));
}

export function updateTodoInArray(todos, id, updates) {
  return todos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo));
}

export function removeTodoFromArray(todos, id) {
  return todos.filter((todo) => todo.id !== id);
}

export function addTodoToArray(todos, newTodo) {
  return [newTodo, ...todos];
}
