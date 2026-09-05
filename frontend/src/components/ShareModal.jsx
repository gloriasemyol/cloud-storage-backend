import { useState } from "react";
import api from "../services/api";

export default function ShareModal({ fileId, onClose }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("VIEWER");
  const [publicLink, setPublicLink] = useState(null);
  const [expiryDays, setExpiryDays] = useState(7);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Share with a specific person by email.
  // NOTE: your backend's Share entity currently expects a userId, not an email.
  // For now we're pretending you have a way to look up a user by email first —
  // you'll want to add a small GET /api/users/by-email endpoint on the backend
  // that returns { id, email, name } so this can look up the real userId before sharing.
  const handleShareWithUser = async (e) => {
    e.preventDefault();
    try {
      // Placeholder: replace 2 with the real looked-up user id
      await api.post("/shares", { fileId, sharedWithUserId: 2, role });
      setMessage(`Shared with ${email} as ${role}`);
      setEmail("");
    } catch {
      setMessage("Could not share — check the email and try again.");
    }
  };

  // Generate a public link
  const handleCreatePublicLink = async () => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(expiryDays));

    const res = await api.post("/public-links", {
      fileId,
      password: password || null,
      expiresAt: expiresAt.toISOString(),
    });

    const link = `${window.location.origin}/shared/${res.data.token}`;
    setPublicLink(link);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(publicLink);
    setMessage("Link copied to clipboard!");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 w-96" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">Share File</h2>

        {/* Share with specific person */}
        <form onSubmit={handleShareWithUser} className="mb-6">
          <label className="text-sm text-gray-600">Share with a person</label>
          <div className="flex gap-2 mt-1">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border rounded p-2 text-sm"
              required
            />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border rounded p-2 text-sm"
            >
              <option value="VIEWER">Viewer</option>
              <option value="EDITOR">Editor</option>
            </select>
          </div>
          <button type="submit" className="mt-2 w-full bg-blue-600 text-white rounded p-2 text-sm">
            Share
          </button>
        </form>

        <hr className="my-4" />

        {/* Public link section */}
        <div>
          <label className="text-sm text-gray-600">Or create a public link</label>
          <div className="flex gap-2 mt-2">
            <input
              type="number"
              value={expiryDays}
              onChange={(e) => setExpiryDays(e.target.value)}
              className="w-20 border rounded p-2 text-sm"
            />
            <span className="text-sm self-center">days</span>
          </div>
          <input
            type="password"
            placeholder="Optional password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded p-2 text-sm mt-2"
          />
          <button
            onClick={handleCreatePublicLink}
            className="mt-2 w-full bg-gray-800 text-white rounded p-2 text-sm"
          >
            Generate Link
          </button>

          {publicLink && (
            <div className="mt-3 flex gap-2">
              <input readOnly value={publicLink} className="flex-1 border rounded p-2 text-xs bg-gray-50" />
              <button onClick={copyLink} className="bg-green-600 text-white rounded px-3 text-sm">
                Copy
              </button>
            </div>
          )}
        </div>

        {message && <p className="text-sm text-blue-600 mt-3">{message}</p>}

        <button onClick={onClose} className="mt-4 text-sm text-gray-500 hover:underline">
          Close
        </button>
      </div>
    </div>
  );
}