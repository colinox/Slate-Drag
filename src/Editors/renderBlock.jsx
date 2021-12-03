import React from "react";
import styled from "styled-components";
import WE from "./renderWE";
import RoleDetails from "./Roles";

const JobDescription = styled.div`
  grid-column: 1/-1;
  border-bottom: 1px solid black;
  padding: 5px 10px;
`;

const From = styled.div`
  grid-column: 1/3;
  padding: 5px 10px;
  border-right: 1px solid black;
`;

const To = styled.div`
  grid-column: 3/-1;
  padding: 5px 10px;
`;

const Para = styled.p`
  user-select: none;
  border: 1px solid red;
  grid-column: 1/-1;

  &.dragging {
    opacity: 0.5;
  }
`;

const Details = styled.div`
  grid-column: 1/-1;
  margin: 10px 20px;
  border: 1px solid black;
  p {
    border: none;
  }
`;

export default (props, editor, next, setEmptyPara, emptyPara) => {
  const { node, attributes, children } = props;
  const { type } = node;
  switch (type) {
    case "we": {
      // console.log("[WE RENDEREED]");
      return (
        <WE
          props={props}
          editor={editor}
          setEmptyPara={setEmptyPara}
          emptyPara={emptyPara}
        />
      );
    }
    case "details": {
      return (
        <Details {...attributes} id={node.key}>
          {children}
        </Details>
      );
    }
    case "roles": {
      return (
        <RoleDetails
          attributes={attributes}
          children={children}
          editor={editor}
          node={node}
          setEmptyPara={setEmptyPara}
        >
          {children}
        </RoleDetails>
      );
    }
    case "job": {
      // console.log("[JOB RENDERED]");
      return <JobDescription {...attributes}>{children}</JobDescription>;
    }

    case "from": {
      // console.log("[FROM RENDERED]");
      return <From {...attributes}>{children}</From>;
    }

    case "to": {
      // console.log("[To RENDERED]");
      return <To {...attributes}>{children}</To>;
    }

    case "paragraph": {
      return (
        <Para {...attributes} draggable={true}>
          {children}
        </Para>
      );
    }

    /**
     * TRIAL 1
     */
    // case "drag": {
    //   return (
    //     <div {...attributes} draggable={true}>
    //       {children}
    //     </div>
    //   );
    // }

    default:
      return next();
  }
};
