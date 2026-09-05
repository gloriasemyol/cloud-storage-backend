import api from "../services/api";
import { useEffect, useState } from "react";

export default function FilePreview({ fileId, onClose }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    api.get(`/files/${fileId}`).then((res) => setUrl(res.data.downloadUrl));
  }, [fileId]);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center" onClick={onClose}>
      <div className="bg-white p-4 rounded-lg max-w-2xl" onClick={(e) => e.stopPropagation()}>
        {url ? <img src={url} alt="preview" className="max-h-[70vh]" /> : <p>Loading...</p>}
        <button onClick={onClose} className="mt-4 text-red-600">Close</button>
      </div>
    </div>
  );
}