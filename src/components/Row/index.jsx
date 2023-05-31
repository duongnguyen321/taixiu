import React from "react";
import rowStyle from "./row.module.css";
export default function Row({ className="", children }) {
  const { row } = rowStyle;
  return <div className={`${row} ${className || ""}`}>{children}</div>;
}
