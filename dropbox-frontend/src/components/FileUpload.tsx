import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUpload }: { onUpload: () => void }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const handleUpload = async () => {
    if (!selectedFile) return alert('No file selected!');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:8080/api/files/upload', formData);
      alert('File uploaded successfully!');
      setSelectedFile(null);
      onUpload();
    } catch (error) {
      alert('Error uploading file');
    }
  };

  return (
    <div className="file-upload-container">
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag & drop a file here, or click to select one</p>
      </div>
      {selectedFile && <p>Selected File: {selectedFile.name}</p>}
      <button onClick={handleUpload} className="upload-button">Upload</button>
    </div>
  );
};

export default FileUpload;
