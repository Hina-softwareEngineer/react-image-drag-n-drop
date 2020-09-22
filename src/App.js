import React, { useState } from "react";
import "./App.css";
import DropZone from "./components/dropzone/dropzone";
import CheckIcon from "@material-ui/icons/Check";
import Snackbar from "@material-ui/core/Snackbar";

function Alert(props) {
  return <div elevation={6} variant="filled" {...props} />;
}

function App() {
  let [isUploaded, setIsUploaded] = useState(false);
  const [open, setOpen] = React.useState(false);

  const uploadSuccess = () => {
    setIsUploaded(true);
  };

  const handleClickAlert = () => {
    setOpen(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div className="App">
      {isUploaded ? (
        <div className="image-upload-card uploaded-card">
          <CheckIcon className="check-icon" />

          <h4>Uploaded Successfully!</h4>

          <div className="uploaded-image-container">
            <img src="" alt="your uploaded image" />
          </div>
        </div>
      ) : (
        <div className="image-upload-card">
          <h2>Upload your Image</h2>
          <p>File should be any Image</p>

          <div className="content">
            <DropZone uploadSuccess={uploadSuccess} />
          </div>
        </div>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
      <Alert severity="error">This is an error message!</Alert>
      <Alert severity="warning">This is a warning message!</Alert>
      <Alert severity="info">This is an information message!</Alert>
      <Alert severity="success">This is a success message!</Alert>
    </div>
  );
}

export default App;
