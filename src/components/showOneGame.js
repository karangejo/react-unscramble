import React, { useEffect, useState, useContext } from "react";
import { animated, useSpring, useTransition, config } from "react-spring";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../userContext";
import { isMobile } from "react-device-detect";
import Card from "./../components/card";
import DeleteIcon from "../png/005-delete-1.png";
import PlayIcon from "../png/002-game.png";
import IconButton from "../components/iconButton";
import ShowGameDetails from "./showGameDetails";

function ShowOneGame(props) {
  const [scrambles, setScrambles] = useState(props.scrambles);
  const [showAll, setShowAll] = useState(false);

  const width = isMobile ? "30vw" : "25vw";
  const transitions = useTransition(showAll, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.stiff,
  });

  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });
  const context = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    setScrambles(props.scrambles);
  }, [props.scrambles]);
  const getData = () => {
    props.getData();
  };

  const playGame = (game) => {
    context.setCurrentGame(game);
    history.push("/play");
  };

  const displayUserScrambles = (scramblesArray) => {
    const items = scramblesArray.scrambles.map((elem, index) => {
      return transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <ShowGameDetails elem={elem} index={index} key={index} />
            </animated.div>
          )
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

  const showDetails = () => {
    setShowAll(!showAll);
  };

  return (
    <animated.div style={fade}>
      <Card key={props.index} onClick={showDetails} style={{ width: width }}>
        <h2 align="center">{props.elem.name}</h2>
        {displayUserScrambles(props.elem)}
        <IconButton icon={PlayIcon} onClick={() => playGame(props.elem)}>
          Play
        </IconButton>
        <IconButton icon={DeleteIcon} onClick={() => deleteGame(props.index)}>
          Delete Game
        </IconButton>
      </Card>
    </animated.div>
  );
}

export default ShowOneGame;
