import { useState } from "react";

export function AddTodoForm({ onSubmit, disabled = false }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    await onSubmit(newTodoTitle);
    setNewTodoTitle("");
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="What needs to be done?"
          disabled={disabled}
          className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!newTodoTitle.trim() || disabled}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Add
        </button>
      </form>
    </div>
  );
}
