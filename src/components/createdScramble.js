import React from "react";
import Card from "./card";
import { animated, useSpring, config } from "react-spring";

function CreatedScramble(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card key={props.index}>
        <h1>{props.element.name}</h1>
        <h2>{props.element.scramble.join(" ")}</h2>
      </Card>
    </animated.div>
  );
}

export default CreatedScramble;
