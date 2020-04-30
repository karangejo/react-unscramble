import React, { useState } from "react";
import Card from "./card";
import useInterval from "./useInterval";
import FlexColumn from "./flexColumn";
import styled from "styled-components";

const Count = styled.h1`
  font-size: 3vw;
`;

function Timer(props) {
  const [time, setTime] = useState(0);

  useInterval(() => {
    setTime(time + 1);
    props.setTime(time + 1);
  }, 1000);

  return (
    <Card>
      <FlexColumn style={{ height: "100%" }}>
        <Count>{time}</Count>
      </FlexColumn>
    </Card>
  );
}

export default Timer;
