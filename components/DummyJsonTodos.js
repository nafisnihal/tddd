"use client";

import { useTodos } from "../hooks/useTodos";
import { AddTodoForm } from "./ui/AddTodoForm";
import { ResetButton } from "./ui/ResetButton";
import { TodoFilters } from "./ui/TodoFilters";
import { TodoHeader } from "./ui/TodoHeader";
import { TodoList } from "./ui/TodoList";
import { TodoPagination } from "./ui/TodoPagination";

export default function DummyJsonTodos() {
  const {
    // State
    todos,
    loading,
    error,
    totalPages,

    // Current filters
    currentPage,
    currentPerPage,
    currentStatus,

    // Actions
    addTodo,
    toggleTodoComplete,
    editTodo,
    removeTodo,
    navigateToPage,
    updateFilter,
    resetLocalChanges,
  } = useTodos();

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <TodoHeader
          title="Todo"
          subtitle="DummyJSON + Local Storage (Hybrid)"
          note="Changes persist locally across page refreshes!"
        />

        <AddTodoForm onSubmit={addTodo} disabled={loading} />

        <ResetButton onReset={resetLocalChanges} disabled={loading} />

        <TodoFilters
          status={currentStatus}
          perPage={currentPerPage}
          onStatusChange={(value) => updateFilter("status", value)}
          onPerPageChange={(value) => updateFilter("per_page", value)}
          disabled={loading}
        />

        <TodoList
          todos={todos}
          loading={loading}
          error={error}
          onToggleComplete={toggleTodoComplete}
          onEdit={editTodo}
          onDelete={removeTodo}
        />

        <TodoPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={navigateToPage}
          disabled={loading}
        />
      </div>
    </div>
  );
}
