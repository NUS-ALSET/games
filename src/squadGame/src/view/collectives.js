import React, { Component } from 'react';
import Collective from './collective';
import { observer } from 'mobx-react';

class Collectives extends Component {
  render(){
    return <div>{this.props.store['collectives'+(this.props.gameId+1)].map((collective, index) => {
      return <Collective key={collective.id} collective={collective}></Collective>;
    })}</div>;
  }
}
export default observer(Collectives);