import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Breadcrumbs from "../components/Breadcrumbs";
import UploadDropzone from "../components/UploadDropzone";
import ShareModal from "../components/ShareModal";
import api from "../services/api";

export default function Dashboard() {
  const [files, setFiles] = useState([]);
  const [path, setPath] = useState([{ id: null, name: "My Drive" }]);
  const [sharingFileId, setSharingFileId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("name");
  const currentFolderId = path[path.length - 1].id;

  // Debounce: wait 400ms after the user stops typing before searching
  useEffect(() => {
    const timer = setTimeout(() => {
      api.get(`/files/search`, {
        params: { ownerId: 1, query: searchQuery, page, size: 20, sortBy },
      }).then((res) => {
        setFiles(res.data.content);
        setTotalPages(res.data.totalPages);
      });
    }, 400);

    return () => clearTimeout(timer); // cancel the old timer if user keeps typing
  }, [searchQuery, page, sortBy]);

  const fetchFiles = () => {
    api.get(`/files/search`, { params: { ownerId: 1, query: searchQuery, page, size: 20, sortBy } })
      .then((res) => {
        setFiles(res.data.content);
        setTotalPages(res.data.totalPages);
      });
  };

  const sortedFiles = [...files].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "date") return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "size") return b.sizeBytes - a.sizeBytes;
    return 0;
  });

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <Breadcrumbs path={path} onNavigate={() => {}} />
        
        <input
          type="text"
          placeholder="Search files..."
          value={searchQuery}
          onChange={(e) => { setSearchQuery(e.target.value); setPage(0); }}
          className="w-full border rounded-lg p-3 mb-4"
        />

        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)} 
          className="border rounded p-2 mb-4"
        >
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="size">Size</option>
        </select>

        <div className="mb-6">
          <UploadDropzone onUploaded={fetchFiles} />
        </div>

        <div className="grid grid-cols-4 gap-4">
          {sortedFiles.map((file) => (
            <div key={file.id} className="border rounded-lg p-4 hover:shadow-md">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm truncate">{file.name}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => setSharingFileId(file.id)}
                  className="text-xs text-blue-600 hover:underline"
                >
                  Share
                </button>
                <button
                  onClick={async () => {
                    await api.delete(`/files/${file.id}`);
                    fetchFiles();
                  }}
                  className="text-xs text-red-500 hover:underline ml-2"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {sortedFiles.length === 0 && (
          <p className="text-gray-400 mt-10 text-center">This folder is empty.</p>
        )}

        <div className="flex justify-center gap-4 mt-6">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 border rounded disabled:opacity-30"
          >
            Previous
          </button>
          <span className="self-center text-sm">Page {page + 1} of {totalPages || 1}</span>
          <button
            disabled={page + 1 >= totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 border rounded disabled:opacity-30"
          >
            Next
          </button>
        </div>

        {sharingFileId && (
          <ShareModal fileId={sharingFileId} onClose={() => setSharingFileId(null)} />
        )}
      </div>
    </div>
  );
}