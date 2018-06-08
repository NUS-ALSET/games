import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from './store/plantSavior';
import brace from "brace";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/github";

const CustomFunctionCode = `var getClosest = function(player, arrayOfPlants){
  var closestPlant = false;
  arrayOfPlants.forEach(plant => {
    if (closestPlant == false) closestPlant = plant;
    else if (
      Math.sqrt(
        Math.pow(player.x - closestPlant.x, 2) +
          Math.pow(player.y - closestPlant.y, 2)
      ) >
      Math.sqrt(
        Math.pow(player.x - plant.x, 2) + Math.pow(player.y - plant.y, 2)
      )
    ) {
      closestPlant = plant;
    }
  });
  return closestPlant;
}
var getDirection = function(player, destination){
  if (destination.y - player.y > 0) {
    var direction = { left: false, right: false, up: false, down: true };
  } else if (destination.y - player.y < 0) {
    var direction = { left: false, right: false, up: true, down: false };
  } else if (destination.x - player.x > 0) {
    var direction = { left: false, right: true, up: false, down: false };
  } else if (destination.x - player.x < 0) {
    var direction = { left: true, right: false, up: false, down: false };
  } else {
var direction = { left: false, right: false, up: true, down: false };
}
  return direction;
}
var player = world.player;
if(world.sickPlants.length==0){
  return { left: false, right: false, up: true, down: false };
}
else if(world.driedPlants.length==0&&world.pestedPlants.length>0){
  if(world.isFilledWithWater){
    return getDirection(world.player, world.factory);
  }
  else if(world.isFilledWithPests){
    var closestPestedPlants = getClosest(world.player, world.pestedPlants);
    return getDirection(world.player, closestPestedPlants);
  }
  else{
    return getDirection(world.player, world.factory);
  }
}
else if(world.driedPlants.length>0&&world.pestedPlants.length==0){
  if(world.isFilledWithWater){
    var closestDriedPlants = getClosest(world.player, world.driedPlants);
    return getDirection(world.player, closestDriedPlants);
  }
  else if(world.isFilledWithPests){
    return getDirection(world.player, world.water);
  }
  else{
    return getDirection(world.player, world.water);
  }
}
else{
  if(world.isFilledWithWater){
    var closestDriedPlants = getClosest(world.player, world.driedPlants);
    return getDirection(world.player, closestDriedPlants);
  }
  else if(world.isFilledWithPests){
    var closestPestedPlants = getClosest(world.player, world.pestedPlants);
    return getDirection(world.player, closestPestedPlants);
  }
  else{
      if(Math.random()>0.5)
          return getDirection(world.player, world.water);
      else
          return getDirection(world.player, world.factory);
  }
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
      <h4>{'function getPlayersCommands(world, playerNum){'}</h4>
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