import React from "react";
import "./style/Star.css";

interface Props {
  size: "forty-eight";
  theme: "filled" | "regular";
  className: any;
}

export const Star = ({ size, theme, className }: Props): JSX.Element => {
  return (
    <img
      className={`star ${className}`}
      alt="Size theme"
      src={
        theme === "filled"
          ? "https://c.animaapp.com/0oQKf5qO/img/size-48--theme-filled.svg"
          : "https://c.animaapp.com/0oQKf5qO/img/star-1.svg"
      }
    />
  );
};
