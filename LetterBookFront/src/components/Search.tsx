import React from "react";
import "./style/Search.css";

interface Props {
  size: "twenty-four";
  theme: "filled";
  className: any;
}

export const Search = ({ size, theme, className }: Props): JSX.Element => {
  return (
    <img
      className={`search ${className}`}
      alt="Search"
      src="https://c.animaapp.com/0oQKf5qO/img/search.svg"
    />
  );
};
