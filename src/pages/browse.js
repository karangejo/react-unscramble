import React, { useEffect, useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../userContext";
import Card from "./../components/card";
import FlexColumn from "./../components/flexColumn";
import FlexRow from "./../components/flexRow";
import Navbar from "../components/navbar";
import IconAttribution from "../components/iconAttribution";
import DeleteIcon from '../png/005-delete-1.png';
import PlayIcon from '../png/002-game.png';
import IconButton from '../components/iconButton';

function Browse(props) {
  const context = useContext(UserContext);
  const history = useHistory();

  const [scrambles, setScrambles] = useState({});
  const [showScrambles, setShowScrambles] = useState(false);

  const getData = () => {
    axios
      .get("http://localhost:3001/scramble/")
      .then((res) => {
        setScrambles(res.data);
        setShowScrambles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const playGame = (game) => {
    context.setCurrentGame(game);
    history.push("/play");
  };

  const displayUserScrambles = (scramblesArray) => {
    const items = scramblesArray.scrambles.map((elem, index) => {
      return (
        <Card key={index}>
          <h3 align="center">{elem.name}</h3>
          <h4 align="center">{elem.scramble.join(" ")}</h4>
        </Card>
      );
    });
    return items;
  };

  const deleteGame = (index) => {
    let data = { id: scrambles[index]._id };
    axios
      .post("http://localhost:3001/scramble/deletebyid", data)
      .then((res) => {
        console.log(res);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const displayScrambles = () => {
    const items = scrambles.map((elem, index) => {
      return (
        <Card key={index}>
          <h2 align="center">{elem.name}</h2>
          {displayUserScrambles(elem)}
          <IconButton icon={PlayIcon} onClick={() => playGame(elem)}>Play</IconButton>
          <IconButton icon={DeleteIcon} onClick={() => deleteGame(index)}>Delete Game</IconButton>
        </Card>
      );
    });
    return items;
  };

  return (
    <FlexColumn>
      <Navbar />
      <FlexRow style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        {showScrambles && displayScrambles()}
      </FlexRow>
      <IconAttribution />
    </FlexColumn>
  );
}

export default Browse;
