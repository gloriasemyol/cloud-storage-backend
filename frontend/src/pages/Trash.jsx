import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

export default function Trash() {
  const [trashedFiles, setTrashedFiles] = useState([]);

  const loadTrash = () => {
    // Reuse the search endpoint but you'll want a dedicated backend method
    // for trashed-only files. Quick addition to FileRepository.java:
    //   List<FileEntity> findByOwnerIdAndTrashedTrue(Long ownerId);
    // and a matching GET /api/files/trash endpoint in FileController.java.
    api.get(`/files/trash`, { params: { ownerId: 1 } }).then((res) => setTrashedFiles(res.data));
  };

  useEffect(() => { loadTrash(); }, []);

  const handleRestore = async (id) => {
    await api.post(`/files/${id}/restore`);
    loadTrash();
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">🗑️ Trash</h1>
        <p className="text-sm text-gray-500 mb-4">
          Items in Trash are kept until you restore or permanently delete them.
        </p>
        <div className="grid grid-cols-4 gap-4">
          {trashedFiles.map((file) => (
            <div key={file.id} className="border rounded-lg p-4 opacity-70">
              <div className="text-3xl mb-2">📄</div>
              <p className="text-sm truncate">{file.name}</p>
              <button
                onClick={() => handleRestore(file.id)}
                className="text-xs text-green-600 mt-2 hover:underline"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
        {trashedFiles.length === 0 && (
          <p className="text-gray-400 mt-10 text-center">Trash is empty.</p>
        )}
      </div>
    </div>
  );
}