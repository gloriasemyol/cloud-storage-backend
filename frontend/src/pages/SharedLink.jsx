import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function SharedLink() {
  const { token } = useParams();
  const [linkData, setLinkData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get(`/public-links/${token}`)
      .then((res) => setLinkData(res.data))
      .catch(() => setError("This link is invalid or has expired."));
  }, [token]);

  if (error) return <div className="p-10 text-center text-red-500">{error}</div>;
  if (!linkData) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-xl font-bold mb-4">Shared File</h1>
        <p className="text-gray-500 mb-4">Someone shared a file with you.</p>
      </div>
    </div>
  );
}