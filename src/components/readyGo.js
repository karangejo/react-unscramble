import React, { useState } from "react";
import Card from "./card";
import useInterval from "./useInterval";
import FlexColumn from "./flexColumn";
import styled from "styled-components";

const Count = styled.h1`
  font-size: 60px;
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
    <Card style={{ height: "50vh", width: "50vw" }}>
      <FlexColumn style={{ height: "100%" }}>
        {time >= 1 ? <Count>{time}</Count> : <Count>Go</Count>}
      </FlexColumn>
    </Card>
  );
}

export default ReadyGo;
