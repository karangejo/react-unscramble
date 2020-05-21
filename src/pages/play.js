import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../userContext";
//import { useHistory } from "react-router-dom";
import Scramble from "../components/Scramble";
import FlexColumn from "../components/flexColumn";
import ReadyGo from "../components/readyGo";
import FinishedGame from "../components/finishedGame";
import queryString from "query-string";
import axios from "axios";
import Alert from "../components/alert";

function Play(props) {
  const context = useContext(UserContext);
  const [currentGame, setCurrentGame] = useState({});
  const [loadedGame, setLoadedGame] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTimer] = useState(0);

  // const isEmptyObj = (Obj) => {
  //   if (Object.keys(Obj).length === 0 && Obj.constructor === Object) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  const getScramble = (id) => {
    axios
      .post(process.env.REACT_APP_GET_ONE_GAME_BY_ID, { id: id })
      .then((res) => {     
        setCurrentGame(res.data[0]);
        setLoadedGame(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const query = queryString.parse(props.location.search);
    getScramble(query.id);
  }, [props.location.search]);

  // useEffect(() => {
  //   if (isEmptyObj(context.currentGame)) {
  //     history.push("/");
  //   }
  // }, [context.currentGame, history]);

  const finishedIntro = () => {
    setShowGame(true);
  };
  const finishedGame = () => {
    setFinished(true);
  };
  const setTime = (time) => {
    setTimer(time);
  };

  return (
    <FlexColumn style={{ height: "100vh", justifyContent: "center" }}>
      {!finished ? (
        showGame ? (
          loadedGame ? (
            <Scramble
              game={currentGame}
              finishedGame={finishedGame}
              setTime={setTime}
            />
          ) : (
            <Alert>Scramble not found!</Alert>
          )
        ) : (
          <ReadyGo
            finished={finishedIntro}
            gameName={context.currentGame.name}
          />
        )
      ) : (
        <FinishedGame finalTime={time} />
      )}
    </FlexColumn>
  );
}

export default Play;
