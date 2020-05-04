import React, { useState } from "react";
import IconButton from "./iconButton";
import Alert from "./alert";
import { isMobile } from "react-device-detect";
import FlexColumn from "./flexColumn";
import ImageIcon from "../png/projector.png";
import Card from "./card";

function UploadFile(props) {
  const [fileName, setFileName] = useState("");
  const [displayImageWarning, setDisplayImageWarning] = useState(false);

  const validateImage = (validationFile) => {
    console.log(typeof validationFile);
    if (!validationFile.type.match(/image.*/)) {
      return false;
    } else {
      return true;
    }
  };

  const changedFile = (event) => {
    props.setCurrentFile([]);
    setFileName("");
    const uploadedFile = event.target.files[0];
    if (validateImage(uploadedFile)) {
      setDisplayImageWarning(false);
      props.setCurrentFile(uploadedFile);
      setFileName(uploadedFile.name);
    } else {
      setDisplayImageWarning(true);
    }
  };

  const displayNotImageWarning = () => {
    return displayImageWarning ? (
      <Alert>Please upload image files.</Alert>
    ) : null;
  };

  const displayFileName = () => {
    return (
      <Card style={{ overflow: "inherit" }}>
        <h5 align="center">{fileName}</h5>
      </Card>
    );
  };

  const activateInput = () => {
    document.getElementById("raised-button-file").click();
  };

  return (
    <FlexColumn style={{ flexDirection: isMobile ? "column" : "row" }}>
      <input
        onChange={changedFile}
        accept="image/*"
        id="raised-button-file"
        name="raised-button-file"
        type="file"
        hidden
      />
      <IconButton icon={ImageIcon} onClick={activateInput}>
        Choose an image
      </IconButton>
      {fileName ? displayFileName() : null}
      {displayNotImageWarning()}
    </FlexColumn>
  );
}

export default UploadFile;
