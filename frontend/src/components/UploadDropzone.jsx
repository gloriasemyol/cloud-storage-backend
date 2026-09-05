import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import api from "../services/api";

export default function UploadDropzone({ onUploaded }) {
  const [progress, setProgress] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    for (const file of acceptedFiles) {
      // Step 1: ask backend for a signed upload URL
      const initRes = await api.post("/files/init-upload", { filename: file.name });
      const { uploadUrl } = initRes.data;

      // Step 2: upload the raw file DIRECTLY to cloud storage using that URL
      const axios = (await import("axios")).default;
      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => setProgress(Math.round((e.loaded * 100) / e.total)),
      });

      // Step 3: tell backend the upload is complete, save metadata
      const s3Key = uploadUrl.split("?")[0].split("/").pop();
      await api.post("/files/complete-upload", {
        name: file.name,
        s3Key,
        sizeBytes: file.size,
        contentType: file.type,
        ownerId: 1, // replace with real logged-in user id
      });

      setProgress(null);
      onUploaded();
    }
  }, [onUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer mb-6
        ${isDragActive ? "bg-blue-50 border-blue-400" : "border-gray-300"}`}
    >
      <input {...getInputProps()} />
      {progress !== null ? (
        <p>Uploading... {progress}%</p>
      ) : (
        <p>Drag & drop files here, or click to select</p>
      )}
    </div>
  );
}