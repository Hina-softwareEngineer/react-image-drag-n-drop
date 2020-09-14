import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DropZone from "./components/dropzone/dropzone";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p className="title">Drag and drop your image here.</p>
        <div className="content">
          <DropZone />
        </div>
      </header>
    </div>
  );
}

export default App;
