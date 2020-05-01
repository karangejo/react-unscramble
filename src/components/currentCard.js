import React from "react";
import Card from "./card";
import { animated, useSpring, config } from "react-spring";

function CurrentCard(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card>
        <h1>{props.scrambleName}</h1>
        <h2>{props.elementString}</h2>
      </Card>
    </animated.div>
  );
}

export default CurrentCard;
