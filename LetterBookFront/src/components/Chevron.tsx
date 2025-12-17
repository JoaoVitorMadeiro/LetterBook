import React from "react";
import "./style/Chevron.css";

interface Props {
  direction: "down";
  size: "sixteen";
  theme: "filled";
  className: any;
  directionDownSize: string;
}

export const Chevron = ({
  direction,
  size,
  theme,
  className,
  directionDownSize = "https://c.animaapp.com/0oQKf5qO/img/direction-down--size-16--theme-filled.svg",
}: Props): JSX.Element => {
  return (
    <img
      className={`chevron ${className}`}
      alt="Direction down size"
      src={directionDownSize}
    />
  );
};