import React from "react";
import buttonStyle from "./button.module.css";
export default function Button({
  children,
  type,
  disabled,
  text,
  className = "",
  onClick,
}) {
  const { btn } = buttonStyle;
  return (
    <button
      onClick={onClick}
      type={type ? type : "button"}
      disabled={disabled && disabled}
      className={`${btn} ${className || ""}`}
    >
      {children || text}
    </button>
  );
}
