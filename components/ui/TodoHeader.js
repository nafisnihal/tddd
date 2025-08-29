export function TodoHeader({ title, subtitle, note }) {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-light text-white mb-2">{title}</h1>
      <p className="text-gray-400">{subtitle}</p>
      {note && <div className="text-xs text-gray-500 mt-1">{note}</div>}
    </div>
  );
}
