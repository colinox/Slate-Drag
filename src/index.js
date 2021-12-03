import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Value } from "slate";
import Editors from "./Editors/editors.jsx";
import "./styles.css";
import { initialValue } from "./initialValue";

const firstEditor = Value.fromJSON(initialValue);

class App extends Component {
  state = {
    value: firstEditor,
    isFocused: false
  };

  editorRef = null;

  handleEditorRef = editorRef => {
    // console.log("[editorRef]", editorRef, editor);
    this.editorRef = editorRef;
  };

  handleChangeEditor = value => {
    this.setState({
      value
    });
  };

  render() {
    // forked
    return (
      <>
        <Editors
          type="editor1"
          value={this.state.value}
          createEditorRef={ref => this.handleEditorRef(ref)}
          handleChange={value => this.handleChangeEditor(value)}
          activateToolbar={this.activateToolbar}
          placeholder="chapter 1"
          handleInsertWe={this.handleInsertWE}
        />
      </>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
