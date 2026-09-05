import { Link } from "react-router-dom";

export default function Sidebar() {
  const items = [
    { label: "My Drive", path: "/dashboard" },
    { label: "Shared with me", path: "/shared" },
    { label: "Starred", path: "/starred" },
    { label: "Trash", path: "/trash" },
  ];
  return (
    <div className="w-56 bg-gray-100 h-screen p-4 border-r">
      <h2 className="font-bold text-lg mb-6">☁️ CloudStorage</h2>
      {items.map((item) => (
        <Link key={item.path} to={item.path} className="block p-2 rounded hover:bg-gray-200 mb-1">
          {item.label}
        </Link>
      ))}
    </div>
  );
}