import React from "react";

function TreeviewItem({ item, id, depth = 0 }) {
  if (!item) {
    return null;
  }
  const innerDependencies = [];
  for (let idx = 0; idx < item.dependencies.length; idx++) {
    innerDependencies.push(
     <TreeviewItem key={idx} item={item.dependencies[idx]} depth={depth + 1} />
    );
  }
  
  return (
    <React.Fragment key={id}>
      <div style={{ paddingLeft: 20*depth}}>
        {item.name} | {item.version}
        {innerDependencies}
      </div>
    </React.Fragment>
  );
}

export default TreeviewItem;
