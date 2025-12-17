import React from "react";
import "./style/Add.css";

interface Props {
  size: "twelve";
  theme: "regular";
  className: any;
  sizeTheme: string;
}

export const Add = ({
  size,
  theme,
  className,
  sizeTheme = "https://c.animaapp.com/0oQKf5qO/img/size-12--theme-regular.svg",
}: Props): JSX.Element => {
  return (
    <img className={`add ${className}`} alt="Size theme" src={sizeTheme} />
  );
};