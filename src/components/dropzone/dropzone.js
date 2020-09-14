import React, { useState } from "react";
import "./dropzone.css";

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const imageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
    if (files.length) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        setSelectedFiles((prevArray) => [...prevArray, files[i]]);
        // add to an array so we can display the name of file
      } else {
        // add a new property called invalid
        // add to the same array so we can display the name of the file
        // set error message
        files[i]["invalid"] = true;
        setErrorMessage("File type not permitted");
      }
    }
  };

  const validateFile = (file) => {
    const validTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/x-icon",
    ];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  return (
    <div className="container">
      <div
        className="drop-container"
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={imageDrop}
      >
        <div className="drop-message">
          <div className="upload-icon"></div>
          Drag & Drop files here or click to upload
        </div>
      </div>
    </div>
  );
};
export default DropZone;
