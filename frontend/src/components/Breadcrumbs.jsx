export default function Breadcrumbs({ path, onNavigate }) {
  // path is an array like [{id: null, name: "My Drive"}, {id: 3, name: "Photos"}]
  return (
    <div className="flex gap-2 text-sm text-gray-600 mb-4">
      {path.map((folder, i) => (
        <span key={folder.id ?? "root"}>
          <button onClick={() => onNavigate(folder.id)} className="hover:underline">
            {folder.name}
          </button>
          {i < path.length - 1 && <span className="mx-1">/</span>}
        </span>
      ))}
    </div>
  );
}