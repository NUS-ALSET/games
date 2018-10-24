import React from 'react';
import {observer} from 'mobx-react';

const ScoreDisplay = ({store, gameId})=>{
    return <span id={"player"+(gameId+1)+"ScoreHolder"}>Player {gameId+1} score: {store.score[gameId]}</span>
}

export default observer(ScoreDisplay);