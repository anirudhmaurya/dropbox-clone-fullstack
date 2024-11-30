import React, { useEffect, useState } from "react";
import axios from "axios";
import "./FileList.css";

interface FileItem {
  id: string;
  name: string;
  type: string;
  size: string; // Size as a string, e.g., "12.3 KB"
}

const FileList = ({ goBack }: { goBack: () => void }) => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [error, setError] = useState<string>("");

  const fetchFiles = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/files");
      const formattedFiles: FileItem[] = response.data.map((file: any) => ({
        id: file.id || "",
        name: file.fileName || "Unknown",
        type: file.fileType || "Unknown",
        size: file.fileSize ? (file.fileSize / 1024).toFixed(2) + " KB" : "Unknown",
      }));
      setFiles(formattedFiles);
    } catch (err: any) {
      console.error("Error fetching files:", err.message || err);
      setError("Error fetching files: " + (err.response?.data?.message || err.message || "Unknown error"));
    }
  };

  const downloadFile = async (fileName: string) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/files/${fileName}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error("Error downloading file:", err);
      alert("Failed to download file.");
    }
  };

  const deleteFile = async (id: any) => {
    try {
      await axios.delete(`http://localhost:8080/api/files/delete/${id}`);
      setFiles(files.filter((file) => file.id !== id));
    } catch (err) {
      console.error("Error deleting file:", err);
      alert("Failed to delete file.");
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div className="file-list">
      <button onClick={goBack}>Back</button>
      <h3>Uploaded Files</h3>
      {error && <p className="error">{error}</p>}
      {files.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Filename</th>
              <th>Type</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <tr key={file.id}>
                <td>{file.name}</td>
                <td>{file.type}</td>
                <td>{file.size}</td>
                <td>
                  <button onClick={() => downloadFile(file.name)}>Download</button>
                  <button onClick={() => deleteFile(file.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No files available.</p>
      )}
    </div>
  );
};

export default FileList;
