import React, { useState } from "react";
import axios from "axios";
import TextInput from "./../components/textInput";
import Card from "./../components/card";
import FlexColumn from "../components/flexColumn";
import FlexRow from "../components/flexRow";
import Navbar from "../components/navbar";
import IconButton from '../components/iconButton';
import AddIcon from '../png/006-file.png';
import ScrambleIcon from '../png/people.png';
import UploadIcon from '../png/upload.png';

function Create(props) {
  const [elements, setElements] = useState([]);
  const [elementString, setElementString] = useState("");
  const [name, setName] = useState("");
  const [scrambleName, setScrambleName] = useState("");
  const [currentElem, setCurrentElem] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showScrambles, setShowScrambles] = useState(false);
  const [scrambles, setScrambles] = useState([]);

  const uploadScrambles = () => {
    let data = {
      name: name,
      scrambles: scrambles,
    };

    axios
      .post("http://localhost:3001/scramble/", data)
      .then((res) => {
        console.log(res);
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

  const addElement = () => {
    let newElements = [...elements];
    newElements.push(currentElem);
    setElements(newElements);
    setElementString(newElements.join(" "));
    setShowCard(true);
    setCurrentElem("");
  };

  const displayCurrentCard = () => {
    return (
      <Card>
        <h1>{scrambleName}</h1>
        <h2>{elementString}</h2>
      </Card>
    );
  };

  const addScramble = () => {
    let newScramble = { name: scrambleName, scramble: elements };
    let scramblesArray = [...scrambles];
    scramblesArray.push(newScramble);
    setScrambles(scramblesArray);
    setShowScrambles(true);
    resetState();
  };

  const displayScrambles = () => {
    const items = scrambles.map((element, index) => {
      return (
        <Card key={index}>
          <h1>{element.name}</h1>
          <h2>{element.scramble.join(" ")}</h2>
        </Card>
      );
    });

    return items;
  };

  return (
    <>
      <FlexColumn>
        <Navbar />
        <Card style={{width: "70vw"}}>
          <FlexColumn>
            <TextInput
              placeholder="Game Name"
              value={name}
              onChange={updateName}
            />
            <TextInput
              placeholder="Scramble Name"
              value={scrambleName}
              onChange={updateScrambleName}
            />
            <FlexRow>
              <TextInput
                placeholder="Element"
                value={currentElem}
                style={{ flex: "2" }}
                onChange={updateCurrentElem}
              />
              <IconButton icon={AddIcon} style={{ flex: "1" }} onClick={addElement}>
                Add Item
              </IconButton>
            </FlexRow>
            <FlexRow>
              <IconButton icon={ScrambleIcon} onClick={addScramble}>Add Scramble</IconButton>
              <IconButton icon={UploadIcon} onClick={uploadScrambles}>Upload All Scrambles</IconButton>
            </FlexRow>
          </FlexColumn>
          {showCard && displayCurrentCard()}
        </Card>
        <FlexRow>{showScrambles && displayScrambles()}</FlexRow>
      </FlexColumn>
    </>
  );
}

export default Create;
