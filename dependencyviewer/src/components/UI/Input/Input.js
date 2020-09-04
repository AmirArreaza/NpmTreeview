import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  return (
    <input className={classes.InputElement} {...props.config} onChange={props.changed}>
      {props.children}
    </input>
  );
};

export default input;
