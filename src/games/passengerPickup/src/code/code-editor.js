import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from './store/passengerPickup';
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";

const CustomFunctionCode = `//continue calculating path if flag calculating is set to true
if(world.calculatingPath){
  findPathCallback();
  return;
}
var player = world.player;
var closestPassenger = false;
if(world.path.length === 0&&!world.passenger){
  //find closest passenger if path is empty
  world.collectives.forEach(passenger => {
    if (closestPassenger === false)
      closestPassenger = passenger;
    else if (
      Math.sqrt(
        Math.pow(player.x - closestPassenger.x, 2) +
          Math.pow(player.y - closestPassenger.y, 2)
      ) >
      Math.sqrt(
        Math.pow(player.x - passenger.x, 2) + Math.pow(player.y - passenger.y, 2)
      )
    ) {
      closestPassenger = passenger;
    }
  });
  if(closestPassenger){
    //finding path to the closest passenger
    findPathCallback(closestPassenger, "passengerLocation");
  }
}
else if(world.path.length === 0&&world.passenger){
  //finding path to passenger takeof destination if passenger is picked up
  findPathCallback(world.passenger, "takeofLocation");
}
else if(world.path.length>0){
  //going to the next cell of current path (once bot reaches this point it will be deleted automaticly)
  var point = world.path[world.path.length-1];
  if (point.x*30 - player.x > 0) {
    var direction = { left: false, right: true, up: false, down: false };
  } else if (point.x*30 - player.x < 0) {
    var direction = { left: true, right: false, up: false, down: false };
  } else if (point.y*30 - player.y > 0) {
    var direction = { left: false, right: false, up: false, down: true };
  } else if (point.y*30 - player.y < 0) {
    var direction = { left: false, right: false, up: true, down: false };
  }
  return direction;
}`;

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 10px',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});
class CodeEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customFunctionCode: CustomFunctionCode,
      updatedCode: CustomFunctionCode,
      errors: [],

    };
    this.updateCustomCode = this.updateCustomCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
  }
  componentDidMount() {
    Store.func = this.state.updatedCode;
  }

  updateCustomCode() {
    console.log('updating code here');
    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      alert('Invalid code,please correct thr code');
      return;
    }
    this.setState({ customFunctionCode: this.state.updatedCode });
    Store.func = this.state.updatedCode;
    //Store.funcNeedUpdate = true;
  }
  handleChange(newCode) {
    this.setState({ updatedCode: newCode });
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }

  render() {
    const { updatedCode } = this.state;
    return <div>
      <h4>{'function getPlayersCommands(world, findPathCallback){'}</h4>
      <AceEditor
        mode="javascript"
        theme="github"
        name="customFunctionCodeEditor"
        width={'100%'}
        onChange={this.handleChange}
        onValidate={this.handleValidation}
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={updatedCode}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
      <h4>{'}'}</h4>
      <button variant="raised" color="primary" onClick={this.updateCustomCode}>
        Update code
       </button>
    </div>;
  }
}
export default CodeEditor;