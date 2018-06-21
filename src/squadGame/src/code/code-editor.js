import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Store from './store/squad';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/mode/python';
import 'brace/theme/github';
import { defaultJavascriptFunctionCode, defaultPythonCodeFunction } from '../commonGameAssets/customCodes';

import '../commonGameAssets/css/editor.css';

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
      customFunctionCode: defaultPythonCodeFunction,
      updatedCode: defaultPythonCodeFunction,
      jsCode: defaultJavascriptFunctionCode,
      updateJsCode: defaultJavascriptFunctionCode,
      errors: [],
      mode: 'python',
    };
    this.resetUndoManager = false;
    this.updateCustomCode = this.updateCustomCode.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleValidation = this.handleValidation.bind(this);
    this.toggleMode = this.toggleMode.bind(this);
    this.handleMode = this.handleMode.bind(this);
    this.handleCodeExecution = this.handleCodeExecution.bind(this);
    this.resetDefaultCode = this.resetDefaultCode.bind(this);
  }
  resetDefaultCode() {
    this.setState({
      customFunctionCode: defaultPythonCodeFunction,
      updatedCode: defaultPythonCodeFunction,
      jsCode: defaultJavascriptFunctionCode,
      updateJsCode: defaultJavascriptFunctionCode,
    });
  }
  updateCustomCode() {
    if (this.state.errors.length > 0) {
      alert('Invalid code,please correct thr code');
      return;
    }
    this.setState({ customFunctionCode: this.state.updatedCode });
    Store.func = this.state.updatedCode;
    //Store.funcNeedUpdate = true;
  }
  toggleMode() {
    this.setState({ showMode: !this.state.showMode });
  }
  handleChange(newCode) {
    if (this.state.mode === 'python') {
      this.setState({ updatedCode: newCode });
    } else {
      this.setState({ jsCode: newCode });
    }
  }
  handleValidation(messages) {
    const errors = messages.filter(msg => (msg.type === 'error' ? true : false));
    this.setState({ errors: errors });
  }

  handleMode(mode) {
    this.setState({ mode });
    this.resetUndoManager = true;
  }
  handleCodeExecution(){
    if (this.state.errors.length > 0) {
      console.log(this.state.errors);
      alert('Invalid code,please correct thr code');
      return;
    }
    if (this.state.mode === 'python') {
      window.world = {};
      window.runPython(this.state.updatedCode);
      this.setState({ jsCode: window.newPySrc, updateJsCode: window.newPySrc });
      this.props.updateProps({ jsCode: window.newPySrc });
      Store.func = `(function() {
        window.world = world;
        ${window.newPySrc}
      }())`;
    } else {
      window.newPySrc = this.state.jscode;
      this.setState({ updateJsCode: this.state.jsCode });
      this.props.updateProps({ jsCode: this.state.jsCode });
      Store.func = `(function() {
        window.world = world;
        ${this.state.jsCode}
        if(typeof getPlayersCommands==='function'){
          window.result=getPlayersCommands(world);
        }
      }())`;
    }
  };
  componentWillMount() {
    window.newPySrc = '';
    window.oldPySrc = '';
    window.result = 'down';
    window.world = null;
    Store.func = `(function() {
      window.world = world;
      ${this.state.jsCode}
      window.result=getPlayersCommands(world);
    }())`;
  }
  componentDidUpdate() {
    if (this.resetUndoManager) {
      const editor = this.refs.alsetEditor.editor;
      editor.getSession().setUndoManager(new window.ace.UndoManager());
      this.resetUndoManager = false;
    }
  }
  render() {
    const { classes } = this.props;
    const { updatedCode, mode, jsCode } = this.state;
    const code = mode === 'python' ? updatedCode : jsCode;
    return (
      <div className="center">
        <div className="main">
          <div className="wrapper">
            <h4 style={{ margin: '4px' }}>
              Write <b className="active-text">{mode.toUpperCase()}</b> Code Here :{' '}
            </h4>
            <h5 style={{ margin: '12px' }}>
              <strong>Note : </strong>Please do not change the name of the function{' '}
              <strong>getPlayersCommands(world)</strong> & function must return one of these direction (LEFT, RIGHT, UP,
              DOWN)
            </h5>
            <div>
              <button
                type="button"
                className={mode === 'python' ? 'btn half active' : 'btn half'}
                onClick={() => this.handleMode('python')}
              >
                Python
              </button>
              <button
                type="button"
                className={mode === 'python' ? 'btn half' : 'btn half active'}
                onClick={() => this.handleMode('javascript')}
              >
                Javascript
              </button>
            </div>
            <div id="editor" className="editor">
              <AceEditor
                ref="alsetEditor"
                name="alset-editor"
                mode={mode}
                theme="github"
                width={'100%'}
                height={'650px'}
                onChange={this.handleChange}
                onValidate={this.handleValidation}
                fontSize={16}
                showPrintMargin={false}
                showGutter={true}
                highlightActiveLine={true}
                enableLiveAutocompletion={true}
                value={code}
                wrapEnabled={true}
                setOptions={{
                  enableBasicAutocompletion: false,
                  enableLiveAutocompletion: false,
                  enableSnippets: false,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </div>
            <div className="">
              <button type="button" className="btn half active" id="run" onClick={this.handleCodeExecution}>
                Update Solution
              </button>
              <button type="button" className="btn half reset" onClick={this.resetDefaultCode}>
                Reset Solution
              </button>
            </div>
          </div>
          <div id="js" className="js" hidden>
            <h4>Python Console</h4>
            <textarea id="python-console" className="res" />
          </div>
        </div>
      </div>
    );
  }
}
export default CodeEditor;
