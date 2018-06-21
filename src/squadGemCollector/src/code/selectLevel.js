import Store from './store/gemCollector';
import React, { Component } from 'react';
import { observer } from 'mobx-react';

class SelectLevel extends Component {
    render() {
        return <div style={{position: 'absolute', marginTop: '-30px'}}>Bot 2 code <select onChange={(e)=>{ Store.level = e.target.value; }}>
            <option value={1}>Level 1</option>
            <option value={2}>Level 2</option>
            <option value={3}>Level 3</option>
        </select></div>
    }
}

export default observer(SelectLevel);