import React, { useState } from "react";
import { animated, useSpring, config } from "react-spring";
import axios from "axios";
import TextInput from "./../components/textInput";
import Card from "./../components/card";
import FlexColumn from "../components/flexColumn";
import FlexRow from "../components/flexRow";
import Navbar from "../components/navbar";
import IconButton from "../components/iconButton";
import AddIcon from "../png/006-file.png";
import ScrambleIcon from "../png/people.png";
import UploadIcon from "../png/upload.png";
import CurrentCard from "../components/currentCard";
import CreatedScramble from "../components/createdScramble";
import CreatedScrambleGame from "../components/createdScrambleGame";
import Alert from "../components/alert";
import UploadFile from "../components/fileUpload";

function Create(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  const [elements, setElements] = useState([]);
  const [elementString, setElementString] = useState("");
  const [name, setName] = useState("");
  const [scrambleName, setScrambleName] = useState("");
  const [currentElem, setCurrentElem] = useState("");
  const [currentImage, setCurrentImage] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [showScrambles, setShowScrambles] = useState(false);
  const [scrambles, setScrambles] = useState([]);
  const [invalidScramble, setInvalidScramble] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadResponse, setUploadResponse] = useState("");
  const [imageArray, setImageArray] = useState([]);

  const resetEverything = () => {
    setShowCard(false);
    setElements([]);
    setElementString("");
    setScrambleName("");
    setCurrentElem("");
    setName("");
    setShowScrambles(false);
    setScrambles([]);
  };

  const validateUpload = () => {
    if (name && !(scrambles.length === 0)) {
      return true;
    } else {
      return false;
    }
  };

  const uploadScrambles = () => {
    if (validateUpload()) {
      let data = {
        name: name,
        scrambles: scrambles,
      };

      axios
        .post("http://localhost:3001/scramble/", data)
        .then((res) => {
          setUploadResponse("Success! Your Scramble game has been uploaded.");
          resetEverything();
          setUploadSuccess(true);
          uploadImages();
        })
        .catch((err) => {
          setUploadSuccess(true);
          setUploadResponse(
            "There was a problem with the upload: " + err.message
          );
        });
    } else {
      setUploadSuccess(true);
      setUploadResponse("Invalid input! Make sure you fill out all fields.");
    }
  };

  const uploadImages = () => {
    console.log("selected many");
    let files = imageArray;
    const formData = new FormData();
    //append all files to formData
    for (var file of files) {
      formData.append("uploadedFiles", file);
    }
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:3030/upload-files", formData, config)
      .then((res) => {
        console.log(res);
        console.log("files Saved");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetState = () => {
    setShowCard(false);
    setElements([]);
    setElementString("");
    setScrambleName("");
    setCurrentElem("");
    setCurrentImage([]);
  };

  const updateCurrentElem = (event) => {
    setCurrentElem(event.currentTarget.value);
  };

  const updateName = (event) => {
    setName(event.currentTarget.value);
  };

  const updateScrambleName = (event) => {
    setScrambleName(event.currentTarget.value);
  };

  const validateElem = (element) => {
    if (element) {
      return true;
    } else {
      return false;
    }
  };

  const addElement = () => {
    if (validateElem(currentElem)) {
      let newElements = [...elements];
      newElements.push(currentElem);
      setElements(newElements);
      setElementString(newElements.join(" "));
      setShowCard(true);
      setCurrentElem("");
      setInvalidScramble(false);
      setUploadSuccess(false);
    }
  };

  const displayCurrentCard = () => {
    return (
      <CurrentCard
        scrambleName={scrambleName}
        elementString={elementString}
        currentImage={currentImage}
      />
    );
  };

  const validateScramble = () => {
    if (scrambleName && !(elements.length === 0) && !(elements.length === 1)) {
      return true;
    } else {
      return false;
    }
  };

  const addFileToUploadArray = () => {
    const newArray = [...imageArray];
    newArray.push(currentImage);
    setImageArray(newArray);
  };

  const addScramble = () => {
    if (validateScramble()) {
      let newScramble = {
        name: scrambleName,
        scramble: elements,
        image: currentImage.name,
      };
      let scramblesArray = [...scrambles];
      scramblesArray.push(newScramble);
      setScrambles(scramblesArray);
      setShowScrambles(true);
      addFileToUploadArray();
      resetState();
      setInvalidScramble(false);
    } else {
      setInvalidScramble(true);
    }
  };

  const displayScrambles = () => {
    const items = scrambles.map((element, index) => {
      return <CreatedScramble key={index} element={element} index={index} />;
    });

    return <CreatedScrambleGame name={name} items={items} />;
  };

  const invalidScrambleAlert = () => {
    return <Alert>Invalid input! Make sure you fill out all fields.</Alert>;
  };

  const displayUploadAlert = () => {
    return <Alert>{uploadResponse}</Alert>;
  };

  return (
    <>
      <FlexColumn>
        <Navbar />
        <animated.div style={fade}>
          <Card style={{ width: "70vw" }}>
            <FlexColumn>
              <TextInput
                placeholder="Game Name"
                value={name}
                onChange={updateName}
              />
              <FlexRow>
                <TextInput
                  placeholder="Scramble Prompt"
                  value={scrambleName}
                  onChange={updateScrambleName}
                />
                <UploadFile setCurrentFile={setCurrentImage} />
              </FlexRow>
              <FlexRow>
                <TextInput
                  placeholder="Element"
                  value={currentElem}
                  style={{ flex: "2" }}
                  onChange={updateCurrentElem}
                />
                <IconButton
                  icon={AddIcon}
                  style={{ flex: "1" }}
                  onClick={addElement}
                >
                  Add Item
                </IconButton>
              </FlexRow>
              <FlexRow>
                <IconButton icon={ScrambleIcon} onClick={addScramble}>
                  Add Scramble
                </IconButton>
                <IconButton icon={UploadIcon} onClick={uploadScrambles}>
                  Upload All Scrambles
                </IconButton>
              </FlexRow>
            </FlexColumn>
            {invalidScramble && invalidScrambleAlert()}
            {showCard && displayCurrentCard()}
          </Card>
        </animated.div>
        {uploadSuccess && displayUploadAlert()}
        <FlexRow>{showScrambles && displayScrambles()}</FlexRow>
      </FlexColumn>
    </>
  );
}

export default Create;
