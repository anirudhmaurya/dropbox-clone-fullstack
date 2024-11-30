import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import './FileUpload.css';

const FileUpload = ({ onUpload }: { onUpload: () => void }) => {
  // State to hold the selected file
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // onDrop handler to set the selected file when a file is dropped
  const onDrop = (acceptedFiles: File[]) => {
    // Set the first accepted file (since only one file is allowed in this case)
    setSelectedFile(acceptedFiles[0]);
  };

  // Setup dropzone hooks to manage file drop and file selection
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  // Handle file upload
  const handleUpload = async () => {
    // Check if a file has been selected
    if (!selectedFile) return alert('No file selected!');

    // Prepare the FormData object to send the file as part of the request
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      // Make the POST request to upload the file
      await axios.post('http://localhost:8080/api/files/upload', formData);
      alert('File uploaded successfully!');
      setSelectedFile(null);
      
      // Notify the parent component (if any) that the upload is complete
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
