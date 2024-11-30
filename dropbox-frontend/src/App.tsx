import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import FileList from './components/FileList';
import './App.css';

const App = () => {
  const [showFileList, setShowFileList] = useState(false);

  return (
    <div className="app-container">
      <Header />
      <main>
        {!showFileList && (
          <div className="homepage-container">
            <FileUpload onUpload={() => setShowFileList(false)} />
            <button className="view-files-button" onClick={() => setShowFileList(true)}>
              View Uploaded Files
            </button>
          </div>
        )}
        {showFileList && <FileList goBack={() => setShowFileList(false)} />}
      </main>
      <Footer />
    </div>
  );
};

export default App;
