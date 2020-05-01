import React, { useState, useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Create from "./pages/create";
import Browse from "./pages/browse";
import Play from "./pages/play";
import Test from "./pages/test";

import { UserContext } from "./userContext";
import "./App.css";

function App() {
  // global state variables that get memoized and passed the to userContext provider
  const [user, setUser] = useState({});
  const [currentGame, setCurrentGame] = useState({});
  const value = useMemo(
    () => ({
      user,
      setUser,
      currentGame,
      setCurrentGame,
    }),
    [user, setUser, currentGame, setCurrentGame]
  );

  return (
    <BrowserRouter>
      <Switch>
        <UserContext.Provider value={value}>
          <Route path="/" component={Browse} exact />
          <Route path="/create" component={Create} />
          <Route path="/play" component={Play} />
          <Route path="/test" component={Test} />
        </UserContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
