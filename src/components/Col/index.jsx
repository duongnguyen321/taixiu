import React from "react";
import colStyle from "./col.module.css";
export default function Col({ className="", children }) {
  const { col } = colStyle;
  return <div className={`${col} ${className || ""}`}>{children}</div>;
}
