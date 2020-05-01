import React from 'react';
//import FinishedGame from '../components/finishedGame';
import ReadyGo from '../components/readyGo';

function Test(props) {
    const finished = () => {
        console.log("finito");

    }
    return (
       <ReadyGo finished={finished}/>
    );
}

export default Test;