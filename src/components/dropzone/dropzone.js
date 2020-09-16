import React, { useState, useRef } from "react";
import axios from "axios";
import "./dropzone.css";

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const uploadRef = useRef();
  const progressRef = useRef();

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
    setSelectedFiles(files);
    //for (let i = 0; i < files.length; i++) {
    //   if (validateFile(files[i])) {
    //     setSelectedFiles((prevArray) => [...prevArray, files[i]]);
    //     // add to an array so we can display the name of file
    //   } else {
    //     // add a new property called invalid
    //     // add to the same array so we can display the name of the file
    //     // set error message
    //     files[i]["invalid"] = true;
    //     setErrorMessage("File type not permitted");
    //   }
    // }
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

  const uploadFiles = () => {
    console.log("selected file", selectedFiles);
    uploadRef.current.innerHTML = "File(s) Uploading...";
    let data = {
      myImage: selectedFiles[0],
    };
    const formData = new FormData();
    formData.append("myImage", selectedFiles[0]);
    console.log("data ", data);
    axios
      .post("http://localhost:4000/upload", formData, {
        onUploadProgress: (progressEvent) => {
          console.log(progressEvent);
          const uploadPercentage = Math.floor(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          progressRef.current.innerHTML = `${uploadPercentage}%`;
          progressRef.current.style.width = `${uploadPercentage}%`;
          if (uploadPercentage === 100) {
            uploadRef.current.innerHTML = "File(s) Uploaded";

            // setValidFiles([...validFiles]);
            setSelectedFiles([selectedFiles]);
            // setUnsupportedFiles([...validFiles]);
          }
        },
      })
      .then((res) => console.log("successfully submitted"))
      .catch(() => {
        // If error, display a message on the upload modal
        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
        // set progress bar background color to red
        progressRef.current.style.backgroundColor = "red";
      });
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

      <button onClick={uploadFiles} className="file-upload-btn">
        Upload your image
      </button>

      <div className="upload-modal">
        Loading...
        <div className="progress-container">
          <span ref={uploadRef}></span>
          <div className="progress">
            <div className="progress-bar" ref={progressRef}></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DropZone;
