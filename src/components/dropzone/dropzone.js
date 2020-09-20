import React, { useState, useRef } from "react";
import axios from "axios";
import "./dropzone.css";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertPhotoIcon from "@material-ui/icons/InsertPhoto";
import LinearProgress from "@material-ui/core/LinearProgress";

import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  buttonColor: {
    backgroundColor: "#1976d2",
    "&:hover": {
      backgroundColor: "#1976d2",
    },
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const DropZone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  let [image64, setImage64] = useState(null);
  const uploadRef = useRef();
  const progressRef = useRef();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

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
    getBase64(files, (result) => {
      console.log(result, "base64 image of me");
      setImage64(result);
    });
    console.log(files);
    if (files.length) {
      handleFiles(files);
    }
  };

  const getBase64 = (file, cb) => {
    let reader = new FileReader();
    console.log("get base 64 file", file[0]);
    reader.readAsDataURL(file[0]);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error while converting.");
    };
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
    let imageObj = {
      imageName: "base-image-" + Date.now(),
      imageData: image64,
    };
    axios
      .post("http://localhost:4000/uploadbase", imageObj, {
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
            // setSelectedFiles([selectedFiles]);
            // setUnsupportedFiles([...validFiles]);
          }
        },
      })
      .then((res) => {
        console.log("successfully submitted", res);

        console.log("response", res.data.newImage.imageData);
        setImage64(res.data.newImage.imageData);
      })
      .catch(() => {
        // If error, display a message on the upload modal
        uploadRef.current.innerHTML = `<span class="error">Error Uploading File(s)</span>`;
        // set progress bar background color to red
        progressRef.current.style.backgroundColor = "red";
      });
  };

  return (
    <div className="container">
      <div className="drop-container">
        <div className="drop-container-content">
          <span>
            <InsertPhotoIcon />
          </span>

          <p>Drag &amp; Drop your Image here</p>
        </div>
      </div>

      <p>Or</p>

      <div>
        <Button
          variant="contained"
          color="primary"
          className={classes.buttonColor}
          startIcon={<CloudUploadIcon />}
        >
          Upload
        </Button>

        <Button variant="outlined" color="primary" onClick={handleToggle}>
          Show backdrop
        </Button>
        <Backdrop
          className={classes.backdrop}
          open={open}
          onClick={handleClose}
        >
          <div className="backdrop-card">
            <h4>Loading...</h4>
            <LinearProgress value={100} />
          </div>
        </Backdrop>
      </div>
      {/* <div
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
      <img src={image64} alt="hello" /> */}
    </div>
  );
};
export default DropZone;
