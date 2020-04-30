import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./card";
import FlexColumn from "./flexColumn";
import Button from "./button";
import styled from "styled-components";

const Finished = styled.div`
  font-size: 60px;
`;

function FinishedGame(props) {
  const history = useHistory();

  const backToBrowse = () => {
    history.push("/");
  };
  return (
    <Card style={{ height: "50vh", width: "50vw" }}>
      <FlexColumn style={{ height: "100%" }}>
        <Finished>Yay! Finished</Finished>
        <Button onClick={backToBrowse}>Back to Games</Button>
      </FlexColumn>
    </Card>
  );
}

export default FinishedGame;
