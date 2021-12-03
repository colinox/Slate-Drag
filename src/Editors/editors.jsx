import React, { PureComponent } from "react";
import { Editor } from "slate-react";
import styled from "styled-components";
import schema from "./schema";
import renderBlock from "./renderBlock";
import renderInline from "./renderInline";

const EditorDiv = styled.div`
  min-height: 150px;
  border: 1px solid black;
  padding: 24px;
`;

class Editors extends PureComponent {
  constructor(props) {
    super(props);
    // console.log(props.value.document.key);
    this.state = {
      value: props.value,
      selectedEditorController: null
    };
    this.tmp = props;
  }

  componentDidMount = () => {
    this.props.createEditorRef(this.editorRef);
  };

  componentDidUpdate = prevProps => {
    if (this.props.value !== prevProps.value) {
      this.setState({
        value: this.props.value
      });
    }
  };

  timer = null;

  onChange = ({ value }) => {
    if (value.document !== this.state.value.document) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => this.props.handleChange(value), 500);
    }
    this.setState({ value });
  };

  /**
   * Drag over the editor
   */
  onDragOver = (e, editor) => {
    // console.log("[DRAG OVER 2]", e.clientY);

    const draggingDataKey = document
      .querySelector(".dragging")
      .getAttribute("data-key");
    const currentBlock = editor.value.document.getNode(draggingDataKey);
    if (currentBlock.type === "roles") return;

    e.preventDefault();

    const draggingOrg = document.querySelector(".dragging");
    const droppable = document.querySelector(".editor");

    const afterOrg = this.getOrgAfterDraggingOrg(droppable, e.clientY);

    if (afterOrg === null) {
      droppable.appendChild(afterOrg);
    } else {
      droppable.insertBefore(draggingOrg, afterOrg);
      droppable.insertBefore(this.state.emptyPara, afterOrg);
    }
  };

  /**
   * Get the organization before which dragging organization needs to be inserted
   */
  getOrgAfterDraggingOrg = (droppable, y) => {
    const draggableElements = [
      ...droppable.querySelectorAll(".draggable:not(.dragging)")
    ];
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  setEmptyPara = emptyPara => {
    // console.log("]empty para[", emptyPara);
    this.setState({
      emptyPara
    });
  };

  renderBlocks = (props, editor, next) => {
    return renderBlock(
      props,
      editor,
      next,
      this.setEmptyPara,
      this.state.emptyPara
    );
  };

  render() {
    const { value } = this.state;
    const { placeholder } = this.props;
    return (
      <EditorDiv>
        <Editor
          ref={editor => {
            this.editorRef = editor;
          }}
          schema={schema}
          value={value}
          placeholder={placeholder}
          onChange={this.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onDragOver={e => this.onDragOver(e, this.editorRef)}
          renderNode={this.renderBlocks}
          renderInline={renderInline}
          className="editor"
        />
      </EditorDiv>
    );
  }
}

export default Editors;
