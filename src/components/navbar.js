import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./card";
import Button from "./button";
import FlexRow from "./flexRow";

function Navbar(props) {
  const history = useHistory();

  return (
    <Card>
      <FlexRow>
        <Button onClick={() => history.push("/")}>Browse Games</Button>
        <Button onClick={() => history.push("/create")}>Create a Game</Button>
      </FlexRow>
    </Card>
  );
}

export default Navbar;
