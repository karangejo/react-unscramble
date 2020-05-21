import React from "react";
import { useHistory } from "react-router-dom";
import Card from "./card";
import FlexRow from "./flexRow";
import FlexColumn from "./flexColumn";
import IconButton from "./iconButton";
import HomeIcon from "../png/003-home.png";
import CreateIcon from "../png/001-media.png";
import MyStuffIcon from "../png/003-file.png";
import styled from "styled-components";
import Login from "./login";

const Title = styled.h1`
  font-family: MedievalSharp;
`;

function Navbar(props) {
  const history = useHistory();

  return (
    <Card style={{ width: "80vw" }}>
      <FlexColumn>
        <Card style={{ padding: "0px 20px 0px 20px" }}>
          <Title>SCRAMBLER</Title>
        </Card>
        <FlexRow>
          <Login />
          <IconButton
            icon={MyStuffIcon}
            onClick={() => history.push("/mystuff")}
          >
            My Stuff
          </IconButton>
          <IconButton icon={HomeIcon} onClick={() => history.push("/")}>
            Browse Games
          </IconButton>
          <IconButton icon={CreateIcon} onClick={() => history.push("/create")}>
            Create a Game
          </IconButton>
        </FlexRow>
      </FlexColumn>
    </Card>
  );
}

export default Navbar;
