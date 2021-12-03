import React from "react";

export default (props, editor, next) => {
  const { node, attributes } = props;
  switch (node.type) {
    case "span":
      return <span {...attributes}>||</span>;
    default:
      return next();
  }
};
