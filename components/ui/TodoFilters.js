export function TodoFilters({
  status,
  perPage,
  onStatusChange,
  onPerPageChange,
  disabled = false,
}) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-48">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Filter by Status
          </label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
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
            value={perPage}
            onChange={(e) => onPerPageChange(e.target.value)}
            disabled={disabled}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none disabled:opacity-50"
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
  );
}
