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
        <h1 align="center">{props.scrambleName}</h1>
        <h2 align="center">{props.elementString}</h2>
        {props.currentImage ? (
          <h3 align="center">{props.currentImage.name}</h3>
        ) : null}
      </Card>
    </animated.div>
  );
}

export default CurrentCard;
