import React, { useEffect, useState } from "react";
import axios from "axios";
import FlexColumn from "./../components/flexColumn";
import FlexRow from "./../components/flexRow";
import Navbar from "../components/navbar";
import IconAttribution from "../components/iconAttribution";
import ShowOneGame from "../components/showOneGame";

function Browse(props) {
  const [scrambles, setScrambles] = useState({});
  const [showScrambles, setShowScrambles] = useState(false);

  const getData = () => {
    axios
      .get("http://210.240.106.168:3001/scramble/")
      .then((res) => {
        console.log(res)
        setScrambles(res.data);
        setShowScrambles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const displayScrambles = () => {
    const items = scrambles.map((elem, index) => {
      return (
        <ShowOneGame
          key={index}
          elem={elem}
          index={index}
          scrambles={scrambles}
          getData={getData}
        />
      );
    });
    return items;
  };

  return (
    <FlexColumn>
      <Navbar />
      <FlexRow style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
        {showScrambles && displayScrambles()}
      </FlexRow>
      <IconAttribution />
    </FlexColumn>
  );
}

export default Browse;
