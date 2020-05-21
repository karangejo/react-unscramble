import React, { useEffect, useState, useContext, useCallback } from "react";
import axios from "axios";
import FlexColumn from "./../components/flexColumn";
import FlexRow from "./../components/flexRow";
import Navbar from "../components/navbar";
import IconAttribution from "../components/iconAttribution";
import ShowOneGame from "../components/showOneGame";
import Alert from "../components/alert";
import { UserContext } from "../userContext";

function Browse(props) {
  const [scrambles, setScrambles] = useState({});
  const [showScrambles, setShowScrambles] = useState(false);
  const context = useContext(UserContext);

  const getData = useCallback( () => {
    axios
      .post(process.env.REACT_APP_GET_ALL_GAMES_BY_ID, {
        ownerId: context.user.userID,
      })
      .then((res) => {
        console.log(res);
        setScrambles(res.data);
        setShowScrambles(true);
      })
      .catch((err) => {
        console.log(err);
      });
  },[context.user.userID])

  useEffect(() => {
    getData();
  }, [context.loggedIn, getData]);

  const displayScrambles = () => {
    const items = scrambles.map((elem, index) => {
      return (
        <ShowOneGame
          key={index}
          elem={elem}
          index={index}
          scrambles={scrambles}
          getData={getData}
          showDelete={true}
        />
      );
    });
    return items;
  };

  const loggedInView = () => {
    return (
      <>
        <FlexRow style={{ alignItems: "flex-start", flexWrap: "wrap" }}>
          {showScrambles && displayScrambles()}
        </FlexRow>
        <IconAttribution />
      </>
    );
  };

  const loggedOutView = () => {
    return <Alert>You must login to view your scrambles!</Alert>;
  };

  const checkLogin = () => {
    if (context.loggedIn) {
      return loggedInView();
    } else {
      return loggedOutView();
    }
  };

  return (
    <FlexColumn>
      <Navbar />
      {checkLogin()}{" "}
    </FlexColumn>
  );
}

export default Browse;
