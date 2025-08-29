import { useState } from "react";

export function TodoItem({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  disabled = false,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.todo);

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditText(todo.todo);
  };

  const handleSaveEdit = async () => {
    if (!editText.trim()) return;

    await onEdit(todo.id, editText);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(todo.todo);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this todo?")) {
      onDelete(todo.id);
    }
  };

  if (isEditing) {
    return (
      <div className="p-4 hover:bg-gray-750 transition-colors">
        <div className="flex gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            disabled={disabled}
            className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            autoFocus
          />
          <button
            onClick={handleSaveEdit}
            disabled={disabled}
            className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50"
          >
            Save
          </button>
          <button
            onClick={handleCancelEdit}
            disabled={disabled}
            className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 hover:bg-gray-750 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onToggleComplete(todo.id, todo.completed)}
          disabled={disabled}
          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors disabled:opacity-50 ${
            todo.completed
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-gray-500 hover:border-emerald-500"
          }`}
        >
          {todo.completed && (
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>

        <span
          className={`flex-1 ${
            todo.completed ? "line-through text-gray-500" : "text-gray-100"
          }`}
        >
          {todo.todo}
        </span>

        <div className="flex gap-2">
          <button
            onClick={handleStartEdit}
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-blue-400 transition-colors disabled:opacity-50"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>

          <button
            onClick={handleDelete}
            disabled={disabled}
            className="p-2 text-gray-400 hover:text-red-400 transition-colors disabled:opacity-50"
            title="Delete"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
