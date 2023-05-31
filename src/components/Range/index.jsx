import React from "react";
import rangeStyle from "./range.module.css";

export default function Range({ value, min, max, onChange }) {
  const { range } = rangeStyle;
  return (
    <input
      type="range"
      value={value}
      min={min.toString()}
      max={max.toString()}
      onChange={onChange}
      className={range}
    />
  );
}
