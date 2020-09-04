import React from "react";
import TreeView from "react-treeview";

const treeItem = (props) => {
  return (
    <div>
      <TreeView
        nodeLabel={props.label}
        collapsed={props.collapsed}
        onClick={props.handleClick}
      >
        + {props.children}
      </TreeView>
    </div>
  );
};

export default treeItem;
