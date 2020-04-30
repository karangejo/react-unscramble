import React, { useState } from "react";
import Card from "./card";
import useInterval from "./useInterval";
import FlexColumn from "./flexColumn";
import styled from "styled-components";
import ReadyIcon from "../png/files-and-folders.png";

const Image = styled.img`
  width: 120px;
  height: 120px;
`;

const Count = styled.h1`
  font-size: 5vw;
`;

const Game = styled.h1`
  font-size: 4vw;
`;

function ReadyGo(props) {
  const [time, setTime] = useState(3);

  useInterval(() => {
    setTime(time - 1);
    if (time - 1 < 0) {
      props.finished();
    }
  }, 1000);

  return (
    <Card style={{ height: "70vh", width: "80vw" }}>
      <FlexColumn style={{ height: "100%" }}>
        <Game>{props.gameName}</Game>
        {time >= 1 ? <Count>{time}</Count> : <Count>Go!</Count>}
        <Image src={ReadyIcon} alt="ready icon" />
      </FlexColumn>
    </Card>
  );
}

export default ReadyGo;
