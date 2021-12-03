import weNodes from "./weNodes";
import { Block } from "slate";

const handleInsertWe = (editor, node) => {
  const weBlock = Block.create({
    type: "we",
    nodes: weNodes
  });
  editor.moveToEndOfNode(node).moveForward(1);
  editor.insertText("a").insertBlock(weBlock);

  console.log("[FOCUS]", editor.value.focusBlock);
};

export default handleInsertWe;
