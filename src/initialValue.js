import weNodes from "./Editors/weNodes.js";
export const initialValue = {
  document: {
    nodes: [
      {
        object: "block",
        type: "we",
        nodes: weNodes
      },
      {
        object: "block",
        type: "paragraph",
        nodes: [
          {
            object: "text",
            leaves: [
              {
                text: "a"
              }
            ]
          }
        ]
      }
    ]
  }
};
