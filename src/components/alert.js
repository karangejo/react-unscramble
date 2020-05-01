import React from "react";
import Card from "./card";
import styled from "styled-components";
import { animated, useSpring, config } from "react-spring";

const AlertText = styled.p`
  color: #e5195f;
  align-self: center;
`;

function Alert(props) {
  const fade = useSpring({
    config: config.molasses,
    opacity: 1,
    from: { opacity: 0 },
  });

  return (
    <animated.div style={fade}>
      <Card>
        <AlertText>{props.children}</AlertText>
      </Card>
    </animated.div>
  );
}

export default Alert;
