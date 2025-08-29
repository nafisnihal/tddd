export function ResetButton({ onReset, disabled = false }) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-300">
          <div className="font-medium">Local Storage Hybrid Mode</div>
          <div className="text-xs text-gray-500 mt-1">
            Changes are saved locally and persist across page refreshes
          </div>
        </div>

        <button
          onClick={onReset}
          disabled={disabled}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          Reset Data
        </button>
      </div>
    </div>
  );
}
