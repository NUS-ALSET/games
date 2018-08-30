import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GemCollectorGame from './code/';
import CustomFunctionCode from './code/customCode';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/github';
import config from './config';
// stores
import GameStore1 from './store/game-store1';
import GameStore2 from './store/game-store2';
import GameStore3 from './store/game-store3';
import GameStore4 from './store/game-store4';

const selectStore = mode => {
  switch (mode) {
    case 'player-vs-player': {
      return GameStore1;
    }
    case 'player-vs-bot': {
      return GameStore2;
    }
    case 'bot-vs-bot': {
      return GameStore3;
    }
    case 'bot-vs-custom-code': {
      return GameStore4;
    }
    default: {
      return GameStore2;
    }
  }
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: '0px 10px',
  },
  paper: {
    textAlign: 'center',
    padding: '40px 20px',
    cursor: 'pointer',
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class PlayGemCollectorGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customFunctionCode: CustomFunctionCode,
      updatedCode: CustomFunctionCode,
      timestamp: 0,
      timing: 1000,
      showMode: true,
      showScore: true,
      scores: [0, 0],
      winner: null,
      playGame: null,
      errors: [],
      store: selectStore(this.props.mode),
    };
    this.getCommands = this.getCommands.bind(this);
    this.getPlayersCommands = this.getPlayersCommands.bind(this);
    this.updateCustomCode = this.updateCustomCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.handleGameEvents = this.handleGameEvents.bind(this);
    this.onWin = this.onWin.bind(this);
    this.toggleScore = this.toggleScore.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
  }

  handleGameEvents(event) {
    if (event.type === 'score_update') {
      if (event.scores[0] !== this.state.scores[0] || event.scores[1] !== this.state.scores[1]) {
        this.setState({ scores: event.scores });
      }
    }

    this.props.onGameEvent(event);
  }
  onWin(winner) {
    console.log('Winner..', winner);
    // this.setState({winner : winner});
  }

  toggleMode() {
    this.setState({ showMode: !this.state.showMode });
  }
  toggleScore() {
    this.setState({ showScore: !this.state.showScore });
  }

  getCommands(world, playerNum) {
    //let player = world.bodies.find(body=>{if(body.label==="character"&&body.customId===playerNum-1) return body;});
    let player = world.players[playerNum - 1];
    let closestGem = false;
    world.stones.forEach(stone => {
      if (closestGem === false) closestGem = stone;
      else if (
        Math.abs(
          Math.sqrt(closestGem.x * closestGem.x + closestGem.y * closestGem.y) -
            Math.sqrt(player.x * player.x + player.y * player.y),
        ) >
        Math.abs(
          Math.sqrt(stone.x * stone.x + stone.y * stone.y) - Math.sqrt(player.x * player.x + player.y * player.y),
        )
      ) {
        closestGem = stone;
      }
    });
    if (closestGem) {
      if (closestGem.x - player.x > 10) {
        return { left: false, right: true, up: false, down: false };
      } else if (closestGem.x - player.x < -10) {
        return { left: true, right: false, up: false, down: false };
      } else if (closestGem.y - player.y > 10) {
        return { left: false, right: false, up: false, down: true };
      } else if (closestGem.y - player.y < -10) {
        return { left: false, right: false, up: true, down: false };
      }
    } else if (Date.now() - this.state.timestamp >= this.state.timing) {
      const newState = Math.floor(Math.random() * (11 - 8 + 1) + 8);
      this.setState({ timestamp: Date.now() });
      if (newState === 11) {
        return { left: false, right: true, up: false, down: false };
      } else if (newState === 10) {
        return { left: false, right: false, up: false, down: true };
      } else if (newState === 9) {
        return { left: true, right: false, up: false, down: false };
      } else if (newState === 8) {
        return { left: false, right: false, up: true, down: false };
      }
    }
  }
  getPlayersCommands(world, playerNum) {
    try {
      let expression = this.state.customFunctionCode;
      let result = eval('(function() {' + expression + '}())');
      return result;
    } catch (err) {
      //console.log(err);
    }
  }
  updateCustomCode() {
    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      alert('Invalid code,please correct thr code');
      return;
    }
    this.props.onGameEvent({
      type: 'code_updated',
    });
    this.setState({ customFunctionCode: this.state.updatedCode });
  }
  handleChange(newCode) {
    this.setState({ updatedCode: newCode });
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }

  render() {
    const { showCodeEditor = false } = this.props;
    return (
      <div>
        {this.initGemCollector()}
        {showCodeEditor && this.initFunctionEditor()}
      </div>
    );
  }

  initGemCollector = () => {
    const { config, mode } = this.props;
    const { store, showMode, showScore } = this.state;
    switch (mode) {
      case 'player-vs-player': {
        return (
          <GemCollectorGame
            store={store}
            config={config}
            mode={mode}
            onGameEvent={this.handleGameEvents}
            onWin={winner => this.onWin(winner)}
          />
        );
      }
      case 'player-vs-bot': {
        return (
          <GemCollectorGame
            store={store}
            config={config}
            mode={mode}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.handleGameEvents}
            player2Function={world => this.getCommands(world, 2)}
          />
        );
      }
      case 'bot-vs-bot': {
        return (
          <GemCollectorGame
            store={store}
            config={config}
            mode={mode}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.handleGameEvents}
            player1Function={world => this.getCommands(world, 1)}
            player2Function={world => this.getCommands(world, 2)}
          />
        );
      }
      case 'bot-vs-custom-code': {
        return (
          <GemCollectorGame
            store={store}
            config={config}
            mode={mode}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.handleGameEvents}
            player1Function={world => this.getPlayersCommands(world, 1)}
            player2Function={world => this.getCommands(world, 2)}
          />
        );
      }
      default: {
        // player-vs-bot
        return (
          <GemCollectorGame
            store={store}
            config={config}
            mode={mode}
            onWin={winner => this.onWin(winner)}
            onGameEvent={this.handleGameEvents}
            player2Function={world => this.getCommands(world, 2)}
          />
        );
      }
    }
  };
  initFunctionEditor = () => {
    const { classes } = this.props;
    const { updatedCode } = this.state;
    return (
      <div>
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
      </div>
    );
  };
}

PlayGemCollectorGame.propTypes = {
  classes: PropTypes.object.isRequired,
  onGameEvent: PropTypes.func,
  showCodeEditor: PropTypes.bool,
  mode: PropTypes.string,
};

PlayGemCollectorGame.defaultProps = {
  mode: config.mode,
  onGameEvent: () => {},
  onWin: () => {},
  showCodeEditor: config.showCodeEditor,
};

export default PlayGemCollectorGame;
