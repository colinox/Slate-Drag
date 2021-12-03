import React from "react";
import styled from "styled-components";
import { roles } from "./weNodes";

const RoleDetailsWrapper = styled.div`
  grid-column: 1/-1;
  position: relative;

  display: grid;
  grid-template-columns: 60px 225px 75px;

  &.dragging {
    color: orange;
    opacity: 0.5;
  }
`;

const Roles = styled.div`
  grid-column: 2;
  border: 1px solid black;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const DragButton = styled.button`
  cursor: move;
  position: absolute;
  width: 60px;
`;

const Add = styled.button`
  height: 20px;
`;

const handleInsertRole = (editor, node) => {
  const nextPara = editor.value.document.getNextBlock(node.key);
  editor
    .moveToEndOfNode(nextPara)
    .insertText("Role Para")
    .moveBackward(9)
    .insertBlock(roles);
};

/**
 * Drag starting organizaiton node
 */
const onDragStart = (e, setEmptyPara) => {
  const el = e.target;
  el.classList.add("dragging");
  el.nextSibling.classList.add("dragging");
  setEmptyPara(el.nextSibling);
};

/**
 * Drag ending organizaiton node
 */
const onDragEnd = e => {
  // console.log("[ON DRAG]", JSON.stringify(e.dataTransfer));
  const el = e.target;
  el.classList.remove("dragging");
  // console.log("[EL ]", el.nextSibling);
  el.nextSibling.classList.remove("dragging");
};

const RoleDetails = ({ attributes, editor, node, children, setEmptyPara }) => {
  return (
    <RoleDetailsWrapper
      draggable={true}
      onDragStart={e => onDragStart(e, setEmptyPara)}
      onDragEnd={onDragEnd}
      {...attributes}
      id={node.key}
      className="roles"
    >
      <DragButton contentEditable={false}>Drag2</DragButton>
      <Roles>{children}</Roles>
      <Add
        contentEditable={false}
        onMouseDown={() => handleInsertRole(editor, node)}
      >
        {" "}
        add role
      </Add>
    </RoleDetailsWrapper>
  );
};

export default RoleDetails;
