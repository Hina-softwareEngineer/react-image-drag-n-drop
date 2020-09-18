import React from "react";
import "./App.css";
import DropZone from "./components/dropzone/dropzone";

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p className="title">Drag and drop your image here.</p>
        <div className="content">
          <DropZone />
        </div>
      </header> */}

      <div className="image-upload-card">
        <h2>Upload your Image</h2>
        <p>File should be any Image</p>

        <div className="content">
          <DropZone />
        </div>
      </div>
    </div>
  );
}

export default App;
