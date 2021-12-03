import React, { Component } from "react";

class ToolSet extends Component {
  state = {};
  render() {
    return (
      <button
        onMouseDown={e => {
          e.preventDefault();
          console.log(`want to access editorRef`);
          this.props.handleInsertWe();
        }}
        type="button"
      >
        Insert text
      </button>
    );
  }
}

export default ToolSet;
