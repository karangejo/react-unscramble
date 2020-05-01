import React from "react";
import Card from "./card";
import FlexRow from "./flexRow";
import { animated, useSpring, config } from "react-spring";

function CreatedScrambleGame(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card>
        <h1 align="center">{props.name}</h1>
        <FlexRow style={{flexWrap: "wrap"}}>{props.items}</FlexRow>
      </Card>
    </animated.div>
  );
}

export default CreatedScrambleGame;
