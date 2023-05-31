import React from "react";
import boxStyle from "./box.module.css";
export default function Box({ children, className = "" }) {
  const { box } = boxStyle;
  return <div className={`${box} ${className || ""}`}>{children}</div>;
}
