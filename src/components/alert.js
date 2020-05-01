import React from "react";
import Card from "./card";
import FlexRow from "./flexRow";
import styled from "styled-components";
import {keyframes } from 'styled-components';
import { animated, useSpring, config } from "react-spring";
import ExplosionIcon from "../png/009-cultures.png";

const bounce = keyframes`
  0%, 100% {
    transform: translate(0, 0px);
  }

  50% {
    transform: translate(0, -10px);
  }
`;

const Image = styled.img`
  width: 30px;
  height: 30px;
  animation: ${bounce} 1s ease infinite;
`;
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
        <FlexRow>
          <Image src={ExplosionIcon} alt="explosion icon" />
          <AlertText>{props.children}</AlertText>
          <Image src={ExplosionIcon} alt="explosion icon" />
        </FlexRow>
      </Card>
    </animated.div>
  );
}

export default Alert;
