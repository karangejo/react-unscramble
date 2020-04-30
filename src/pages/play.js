import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "./../userContext";
import { useHistory } from "react-router-dom";
import Scramble from "../components/Scramble";
import FlexColumn from "../components/flexColumn";
import ReadyGo from "../components/readyGo";
import FinishedGame from "../components/finishedGame";

function Play() {
  const context = useContext(UserContext);
  const history = useHistory();

  const [showGame, setShowGame] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTimer] = useState(0);

  const isEmptyObj = (Obj) => {
    if (Object.keys(Obj).length === 0 && Obj.constructor === Object) {
      return true;
    } else {
      return false;
    }
  };
  useEffect(() => {
    if (isEmptyObj(context.currentGame)) {
      history.push("/");
    }
  }, [context.currentGame, history]);

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
          <Scramble
            game={context.currentGame}
            finishedGame={finishedGame}
            setTime={setTime}
          />
        ) : (
          <ReadyGo finished={finishedIntro} gameName={context.currentGame.name}/>
        )
      ) : (
        <FinishedGame finalTime={time} />
      )}
    </FlexColumn>
  );
}

export default Play;
