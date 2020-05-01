import React from "react";
import Card from "./card";
import { animated, useSpring, config } from "react-spring";

function ShowGameDetails(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card key={props.index}>
        <h3 align="center">{props.elem.name}</h3>
        <h4 align="center">{props.elem.scramble.join(" ")}</h4>
      </Card>
    </animated.div>
  );
}

export default ShowGameDetails;
