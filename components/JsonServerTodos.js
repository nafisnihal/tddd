"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// JSON Server API functions
async function fetchTodos(page = 1, per_page = 10, status = "all") {
  let url = `http://localhost:3001/todos?_page=${page}&_per_page=${per_page}`;
  if (status !== "all") {
    url += `&completed=${status === "completed"}`;
  }
  const res = await fetch(url);
  const response = await res.json();
  const data = response.data || response;
  const total = response.items || response.length || 0;
  return { data: Array.isArray(data) ? data : [], total: Number(total) };
}

async function createTodo(title) {
  const res = await fetch("http://localhost:3001/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, completed: false }),
  });
  return res.json();
}

async function updateTodo(id, updates) {
  const res = await fetch(`http://localhost:3001/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return res.json();
}

async function deleteTodo(id) {
  await fetch(`http://localhost:3001/todos/${id}`, {
    method: "DELETE",
  });
}

export default function JsonServerTodos() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [todos, setTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");

  const page = Number(searchParams.get("page")) || 1;
  const per_page = Number(searchParams.get("per_page")) || 10;
  const status = searchParams.get("status") || "all";

  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      try {
        const { data, total } = await fetchTodos(page, per_page, status);
        setTodos(data);
        setTotalPages(Math.max(1, Math.ceil(total / per_page)));
      } catch (error) {
        console.error("Failed to fetch todos:", error);
        setTodos([]);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [page, per_page, status]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", newPage.toString());
    if (per_page !== 10) {
      params.set("per_page", per_page.toString());
    }
    if (status !== "all") {
      params.set("status", status);
    }
    router.push(`/?${params.toString()}`);
  };

  const handleFilterChange = (filterType, value) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (filterType === "status") {
      if (value === "all") {
        params.delete("status");
      } else {
        params.set("status", value);
      }
    } else if (filterType === "per_page") {
      if (value === "10") {
        params.delete("per_page");
      } else {
        params.set("per_page", value);
      }
    }

    router.push(`/?${params.toString()}`);
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault();
    if (!newTodoTitle.trim()) return;

    try {
      await createTodo(newTodoTitle.trim());
      setNewTodoTitle("");
      const { data, total } = await fetchTodos(page, per_page, status);
      setTodos(data);
      setTotalPages(Math.max(1, Math.ceil(total / per_page)));
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const handleToggleComplete = async (id, completed) => {
    try {
      await updateTodo(id, { completed: !completed });
      const { data, total } = await fetchTodos(page, per_page, status);
      setTodos(data);
      setTotalPages(Math.max(1, Math.ceil(total / per_page)));
    } catch (error) {
      console.error("Failed to toggle todo:", error);
    }
  };

  const handleStartEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
  };

  const handleSaveEdit = async (id) => {
    if (!editingTitle.trim()) return;

    try {
      await updateTodo(id, { title: editingTitle.trim() });
      setEditingId(null);
      setEditingTitle("");
      const { data, total } = await fetchTodos(page, per_page, status);
      setTodos(data);
      setTotalPages(Math.max(1, Math.ceil(total / per_page)));
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingTitle("");
  };

  const handleDeleteTodo = async (id) => {
    if (!confirm("Are you sure you want to delete this todo?")) return;

    try {
      await deleteTodo(id);
      const { data, total } = await fetchTodos(page, per_page, status);
      setTodos(data);
      setTotalPages(Math.max(1, Math.ceil(total / per_page)));

      if (data.length === 0 && page > 1) {
        handlePageChange(page - 1);
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2">Todo</h1>
          <p className="text-gray-400">JSON Server Approach</p>
        </div>

        {/* Add New Todo */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6 mb-6">
          <form onSubmit={handleCreateTodo} className="flex gap-3">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <button
              type="submit"
              disabled={!newTodoTitle.trim()}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Add
            </button>
          </form>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Filter by Status
              </label>
              <select
                value={status}
                onChange={(e) => handleFilterChange("status", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="all" className="bg-gray-700">
                  All Todos
                </option>
                <option value="completed" className="bg-gray-700">
                  Completed
                </option>
                <option value="pending" className="bg-gray-700">
                  Pending
                </option>
              </select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Items per Page
              </label>
              <select
                value={per_page}
                onChange={(e) => handleFilterChange("per_page", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 appearance-none"
              >
                <option value="5" className="bg-gray-700">
                  5 per page
                </option>
                <option value="10" className="bg-gray-700">
                  10 per page
                </option>
                <option value="15" className="bg-gray-700">
                  15 per page
                </option>
                <option value="20" className="bg-gray-700">
                  20 per page
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Todo List */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 mb-6">
          {loading ? (
            <div className="p-8 text-center text-gray-400">
              <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mb-2"></div>
              <div>Loading todos...</div>
            </div>
          ) : todos.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <div className="text-4xl mb-2">📝</div>
              <div>No todos found</div>
              <div className="text-sm text-gray-500">
                Create your first todo above
              </div>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {todos.map((todo) => (
                <div
                  key={todo.id}
                  className="p-4 hover:bg-gray-750 transition-colors"
                >
                  {editingId === todo.id ? (
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(e) => setEditingTitle(e.target.value)}
                        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        autoFocus
                      />
                      <button
                        onClick={() => handleSaveEdit(todo.id)}
                        className="px-3 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          handleToggleComplete(todo.id, todo.completed)
                        }
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                          todo.completed
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-gray-500 hover:border-emerald-500"
                        }`}
                      >
                        {todo.completed && (
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
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
                          todo.completed
                            ? "line-through text-gray-500"
                            : "text-gray-100"
                        }`}
                      >
                        {todo.title}
                      </span>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(todo.id, todo.title)}
                          className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
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
                          onClick={() => handleDeleteTodo(todo.id)}
                          className="p-2 text-gray-400 hover:text-red-400 transition-colors"
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
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        {!loading && todos.length > 0 && (
          <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {page} of {totalPages}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(page > 1 ? page - 1 : 1)}
                  disabled={page === 1}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    page === 1
                      ? "border-gray-600 text-gray-500 cursor-not-allowed"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                  }`}
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    handlePageChange(page < totalPages ? page + 1 : totalPages)
                  }
                  disabled={page === totalPages}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    page === totalPages
                      ? "border-gray-600 text-gray-500 cursor-not-allowed"
                      : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
