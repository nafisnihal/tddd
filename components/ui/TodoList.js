import { TodoItem } from "./TodoItem";

export function TodoList({
  todos,
  loading,
  error,
  onToggleComplete,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
        <div className="p-8 text-center text-gray-400">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-2"></div>
          <div>Loading todos...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
        <div className="p-8 text-center text-red-400">
          <div className="text-4xl mb-2">⚠️</div>
          <div>Failed to load todos</div>
          <div className="text-sm text-gray-500 mt-1">{error}</div>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
        <div className="p-8 text-center text-gray-400">
          <div className="text-4xl mb-2">📝</div>
          <div>No todos found</div>
          <div className="text-sm text-gray-500">
            Create your first todo above
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
      <div className="divide-y divide-gray-700">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggleComplete={onToggleComplete}
            onEdit={onEdit}
            onDelete={onDelete}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
}
