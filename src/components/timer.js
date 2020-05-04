import React, { useState } from "react";
import Card from "./card";
import useInterval from "./useInterval";
import styled from "styled-components";

const Count = styled.h1`
  font-size: 3vw;
  align-self: center;
`;

function Timer(props) {
  const [time, setTime] = useState(0);

  useInterval(() => {
    setTime(time + 1);
    props.setTime(time + 1);
  }, 1000);

  return (
    <Card>
      <Count>{time}</Count>
    </Card>
  );
}

export default Timer;
