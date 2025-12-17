import React from "react";
import "./style/Link.css";

interface Props {
  size: "forty-eight";
  theme: "regular";
  className: any;
}

export const Link = ({ size, theme, className }: Props): JSX.Element => {
  return (
    <img
      className={`link ${className}`}
      alt="Size theme"
      src="https://c.animaapp.com/0oQKf5qO/img/link.svg"
    />
  );
};