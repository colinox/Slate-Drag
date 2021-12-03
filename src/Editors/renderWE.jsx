import styled from "styled-components";
import React, { Component } from "react";
import handleInsertWe from "./handleInsertWE";

const Wrapper = styled.div`
  display: grid;
  border: 1px solid black;
  margin-bottom: 10px;
  margin: 50px;
  position: relative;
  padding: 10px;

  &.dragging {
    color: orange;
    opacity: 0.5;
  }
`;

const Children = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const Button = styled.button`
  grid-column: 1/-1;
  justify-self: center;
  cursor: pointer;
  user-select: none;
  margin: 5px 10px;

  position: absolute;
  right: -86px;
  top: -6px;
`;

const DragButton = styled.button`
  cursor: move;
  position: absolute;
  width: 60px;
  left: -60px;
`;

class WE extends Component {
  state = {};

  /**
   * Drag starting organizaiton node
   */
  onDragStart = e => {
    // console.log("[ON DRAG]", e.dataTransfer, e.dataTransfer.getData("text"));
    const el = e.target;
    el.classList.add("dragging");
    el.nextSibling.classList.add("dragging");

    /**
     * TRAIL 1
     */
    // const { props, editor } = this.props;
    // const { node } = props;

    // editor.wrapBlock({
    //   type: "drag",
    //   object: "block"
    // });

    /**
     * TRAIL 2
     */
    // e.target.appendChild(e.target.nextSibling);
    // e.dataTransfer.setData('text/html',el.nextSibling)

    /**
     * TRAIL 3
     */
    const { setEmptyPara } = this.props;
    setEmptyPara(el.nextSibling);

    /**
     * TRAIL 4
     */
    // console.log("[DROP]", e.dataTransfer.items);
    // const dataList = e.dataTransfer.items;
    // dataList.add(`${el.nextSibling}`, "text/html");
  };

  /**
   * Drag ending organizaiton node
   */
  onDragEnd = e => {
    // console.log("[ON DRAG]", JSON.stringify(e.dataTransfer));
    const el = e.target;
    el.classList.remove("dragging");
    el.nextSibling.classList.remove("dragging");
  };

  onDragOver = (e, editor) => {
    // console.log("[DRAG OVER 2]", document.querySelector('.dragging').getAttribute('data-key'));
    const draggingEl = document.querySelector(".dragging");
    const draggingDataKey = draggingEl.getAttribute("data-key");

    const currentBlock = editor.value.document.getNode(draggingDataKey);

    if (currentBlock.type === "we") return;

    const parentBlock = editor.value.document.getParent(draggingDataKey);
    // console.log('[PARENT BLOCK]', parentBlock)

    const details = parentBlock.nodes.toArray()[0];
    const detailsEl = document.getElementById(details.key);
    // console.log("[PREV BLOCK]", e.clientY, detailsEl.getBoundingClientRect());
    if (e.clientY < detailsEl.getBoundingClientRect().bottom) {
      e.stopPropagation();
      return;
    }
    // console.log("[DRAG OVER 1]", e.target);

    e.preventDefault();

    const droppable = document.querySelector(".org");
    // console.log('[DROPPABLE]', droppable[1]);

    const afterOrg = this.getOrgAfterDraggingOrg(droppable, e.clientY);

    // console.log('[AFTER ORG]', afterOrg)

    if (afterOrg === null) {
      // droppable.appendChild(afterOrg);
    } else {
      // console.log('[DRAG ELE]', draggingEl, afterOrg);
      droppable.insertBefore(draggingEl, afterOrg);
      // console.log('[EMPTY PARA]', this.props.emptyPara)
      droppable.insertBefore(this.props.emptyPara, afterOrg);
    }
  };

  /*
   * Get the organization before which dragging organization needs to be inserted
   */
  getOrgAfterDraggingOrg = (droppable, y) => {
    const draggableElements = [
      ...droppable.querySelectorAll(".roles:not(.dragging)")
    ];
    // console.log("[DRAGGABLE]", draggableElements);
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
          // console.log("[OFFSET]", child);
          return { offset, element: child };
        } else {
          // console.log("[ClOSEST]");
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  };

  render() {
    const { props, editor } = this.props;
    const { node, attributes, children } = props;

    return (
      <Wrapper
        {...attributes}
        className="draggable"
        draggable={true}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        onDragOver={e => this.onDragOver(e, editor)}
      >
        <DragButton contentEditable={false}>Drag</DragButton>
        <Children draggable={false} className="org">
          {children}
        </Children>
        <Button
          onMouseDown={e => {
            e.preventDefault();
            handleInsertWe(editor, node);
          }}
          contentEditable={false}
        >
          Add WE
        </Button>
      </Wrapper>
    );
  }
}

export default WE;
