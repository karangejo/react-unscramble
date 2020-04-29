import React, { useState } from "react";
import TextInput from "./../components/textInput";
import Button from "./../components/button";
import Card from "./../components/card";
import FlexColumn from "../components/flexColumn";
import FlexRow from "../components/flexRow";

function Create(props) {
  const [elements, setElements] = useState([]);
  const [elementString, setElementString] = useState("");
  const [name, setName] = useState("");
  const [currentElem, setCurrentElem] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [showScrambles, setShowScrambles] = useState(false);
  const [scrambles, setScrambles] = useState([]);

  const resetState = () => {
    setShowCard(false);
    setElements([]);
    setElementString("");
    setName("");
    setCurrentElem("");
  };

  const updateCurrentElem = (event) => {
    setCurrentElem(event.currentTarget.value);
  };

  const updateName = (event) => {
    setName(event.currentTarget.value);
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
        <h1>{name}</h1>
        <h2>{elementString}</h2>
      </Card>
    );
  };

  const addScramble = () => {
    let newScramble = { name: name, scramble: elements };
    let scramblesArray = [...scrambles];
    scramblesArray.push(newScramble);
    setScrambles(scramblesArray);
    setShowScrambles(true);
    resetState();
  };

  const displayScrambles = () => {
    const items = scrambles.map((element, index) => {
      return (
        <Card>
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
        <Card>
          <FlexColumn>
            <TextInput placeholder="name" value={name} onChange={updateName} />
            <FlexRow>
              <TextInput
                placeholder="element"
                value={currentElem}
                style={{ flex: "2" }}
                onChange={updateCurrentElem}
              />
              <Button style={{ flex: "1" }} onClick={addElement}>
                Add Item
              </Button>
            </FlexRow>
            <Button onClick={addScramble}>Add Scramble</Button>
          </FlexColumn>
          {showCard && displayCurrentCard()}
        </Card>
        <FlexRow>{showScrambles && displayScrambles()}</FlexRow>
      </FlexColumn>
    </>
  );
}

export default Create;
