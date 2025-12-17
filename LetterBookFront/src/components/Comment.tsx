import React from "react";
import "./style/Comment.css";

interface Props {
  size: "twelve";
  theme: "relax" | "hover";
  className: any;
}

export const Comment = ({ size, theme, className }: Props): JSX.Element => {
  return (
    <img
      className={`comment ${className}`}
      alt="Size theme relax"
      src={
        theme === "hover"
          ? "https://c.animaapp.com/0oQKf5qO/img/size-12--theme-hover.svg"
          : "https://c.animaapp.com/0oQKf5qO/img/comment-1.svg"
      }
    />
  );
};