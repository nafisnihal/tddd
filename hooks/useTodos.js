// Custom hooks for todo management

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  clearLocalChanges,
  createTodo,
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "../lib/dummyjson-api";
import {
  addTodoToArray,
  calculateTotalPages,
  filterTodosByStatus,
  paginateTodos,
  removeTodoFromArray,
  updateTodoInArray,
} from "../lib/todo-utils";
import {
  createUrlParams,
  getPageFromParams,
  getPerPageFromParams,
  getStatusFromParams,
} from "../lib/url-utils";

export function useTodos() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [allTodos, setAllTodos] = useState([]);
  const [displayedTodos, setDisplayedTodos] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URL parameters
  const page = getPageFromParams(searchParams);
  const perPage = getPerPageFromParams(searchParams);
  const status = getStatusFromParams(searchParams);

  // Load todos effect
  useEffect(() => {
    const loadTodos = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch all todos (DummyJSON doesn't support status filtering)
        const { data } = await fetchTodos(0, 150);
        setAllTodos(data);

        // Apply filtering and pagination
        const filtered = filterTodosByStatus(data, status);
        const paginated = paginateTodos(filtered, page, perPage);

        setDisplayedTodos(paginated);
        setTotalPages(calculateTotalPages(filtered.length, perPage));
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        setError(err.message);
        setAllTodos([]);
        setDisplayedTodos([]);
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, [page, perPage, status]);

  // Navigation functions
  const navigateToPage = (newPage) => {
    const params = createUrlParams(searchParams, {
      page: newPage,
      per_page: perPage === 10 ? null : perPage,
      status: status === "all" ? null : status,
    });
    router.push(`/?${params.toString()}`);
  };

  const updateFilter = (filterType, value) => {
    const updates = { page: 1 }; // Reset to first page

    if (filterType === "status") {
      updates.status = value === "all" ? null : value;
    } else if (filterType === "per_page") {
      updates.per_page = value === "10" ? null : value;
    }

    const params = createUrlParams(searchParams, updates);
    router.push(`/?${params.toString()}`);
  };

  // CRUD operations
  const addTodo = async (todoText) => {
    if (!todoText.trim()) return;

    try {
      const newTodo = await createTodo(todoText.trim());
      const updatedTodos = addTodoToArray(allTodos, newTodo);
      setAllTodos(updatedTodos);

      // Refresh display
      refreshDisplay(updatedTodos);
    } catch (err) {
      console.error("Failed to create todo:", err);
      setError(err.message);
    }
  };

  const toggleTodoComplete = async (id, currentCompleted) => {
    try {
      await updateTodo(id, { completed: !currentCompleted });
      const updatedTodos = updateTodoInArray(allTodos, id, {
        completed: !currentCompleted,
      });
      setAllTodos(updatedTodos);

      // Refresh display
      refreshDisplay(updatedTodos);
    } catch (err) {
      console.error("Failed to toggle todo:", err);
      setError(err.message);
    }
  };

  const editTodo = async (id, newText) => {
    if (!newText.trim()) return;

    try {
      await updateTodo(id, { todo: newText.trim() });
      const updatedTodos = updateTodoInArray(allTodos, id, {
        todo: newText.trim(),
      });
      setAllTodos(updatedTodos);

      // Refresh display
      refreshDisplay(updatedTodos);
    } catch (err) {
      console.error("Failed to update todo:", err);
      setError(err.message);
    }
  };

  const removeTodo = async (id) => {
    try {
      await deleteTodo(id);
      const updatedTodos = removeTodoFromArray(allTodos, id);
      setAllTodos(updatedTodos);

      // Refresh display and check if we need to go to previous page
      const filtered = filterTodosByStatus(updatedTodos, status);
      const paginated = paginateTodos(filtered, page, perPage);

      if (paginated.length === 0 && page > 1) {
        navigateToPage(page - 1);
      } else {
        refreshDisplay(updatedTodos);
      }
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setError(err.message);
    }
  };

  // Helper to refresh displayed todos
  const refreshDisplay = (todos) => {
    const filtered = filterTodosByStatus(todos, status);
    const paginated = paginateTodos(filtered, page, perPage);

    setDisplayedTodos(paginated);
    setTotalPages(calculateTotalPages(filtered.length, perPage));
  };

  // Reset all local changes and reload
  const resetLocalChanges = async () => {
    if (
      confirm(
        "This will clear all your local changes and reload original data. Continue?"
      )
    ) {
      clearLocalChanges();

      // Reload todos
      setLoading(true);
      try {
        const { data } = await fetchTodos(0, 150);
        setAllTodos(data);
        refreshDisplay(data);
      } catch (err) {
        console.error("Failed to reload todos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    // State
    todos: displayedTodos,
    loading,
    error,
    totalPages,

    // Current filters
    currentPage: page,
    currentPerPage: perPage,
    currentStatus: status,

    // Actions
    addTodo,
    toggleTodoComplete,
    editTodo,
    removeTodo,
    navigateToPage,
    updateFilter,
    resetLocalChanges,
  };
}
