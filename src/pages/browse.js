import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../userContext";
import Card from "./../components/card";
import FlexColumn from "./../components/flexColumn";
import FlexRow from "./../components/flexRow";
import Button from "./../components/button";
import Navbar from "../components/navbar";

function Browse(props) {
  const context = useContext(UserContext);
  const history = useHistory();

  const [scrambles, setScrambles] = useState({});
  const [showScrambles, setShowScrambles] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/scramble/")
      .then((res) => {
        setScrambles(res.data);
        setShowScrambles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const playGame = (game) => {
    context.setCurrentGame(game);
    history.push("/play");
  };

  const displayUserScrambles = (scramblesArray) => {
    const items = scramblesArray.scrambles.map((elem, index) => {
      return (
        <Card key={index}>
          <h3>{elem.name}</h3>
          <h4>{elem.scramble.join(" ")}</h4>
        </Card>
      );
    });
    return items;
  };

  const displayScrambles = () => {
    const items = scrambles.map((elem, index) => {
      return (
        <Card key={index}>
          <h2 align="center">{elem.name}</h2>
          {displayUserScrambles(elem)}
          <Button onClick={() => playGame(elem)}>Play</Button>
        </Card>
      );
    });
    return items;
  };

  return (
    <FlexColumn>
      <Navbar/>
      <FlexRow style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        {showScrambles && displayScrambles()}
      </FlexRow>
    </FlexColumn>
  );
}

export default Browse;
