export function TodoPagination({
  currentPage,
  totalPages,
  onPageChange,
  disabled = false,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1 || disabled}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === 1 || disabled
                ? "border-gray-600 text-gray-500 cursor-not-allowed"
                : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
            }`}
          >
            Previous
          </button>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages || disabled}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              currentPage === totalPages || disabled
                ? "border-gray-600 text-gray-500 cursor-not-allowed"
                : "border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
