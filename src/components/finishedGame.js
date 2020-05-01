import React from "react";
import { useHistory } from "react-router-dom";
import { animated, useSpring, config } from "react-spring";
import Card from "./card";
import FlexColumn from "./flexColumn";
import FLexRow from "./flexRow";
import IconButton from "./iconButton";
import styled from "styled-components";
import PartyIcon from "../png/007-xmas.png";
import BallonsIcon from "../png/010-new-year.png";
import CakeIcon from "../png/008-food-and-restaurant.png";

const Image = styled.img`
  width: 60px;
  height: 60px;
`;

const Finished = styled.div`
  font-size: 5vw;
  text-align: center;
  padding: 8px;
`;
const Time = styled.div`
  font-size: 4vw;
`;

function FinishedGame(props) {
  const history = useHistory();
  const fade = useSpring({
    config: config.stiff,
    opacity: 1,
    from: { opacity: 0 },
  });

  const backToBrowse = () => {
    history.push("/");
  };
  return (
    <animated.div style={fade}>
      <Card style={{ height: "70vh", width: "80vw", padding: "30px" }}>
        <FlexColumn style={{ height: "100%" }}>
          <FLexRow>
            <Image src={PartyIcon} alt="party hat icon" />
            <Finished>Yay! Finished</Finished>
            <Image src={BallonsIcon} alt="ballons icon" />
          </FLexRow>

          <Time>Your time is: {props.finalTime} seconds</Time>
          <Time>Great Job!</Time>
          <IconButton icon={CakeIcon} onClick={backToBrowse}>
            Back to Games
          </IconButton>
        </FlexColumn>
      </Card>
    </animated.div>
  );
}

export default FinishedGame;
