import React from "react";
import "./style/Divider.css";

interface Props {
  className: any;
  vector: string;
}

export const Divider = ({
  className,
  vector = "https://c.animaapp.com/0oQKf5qO/img/vector-3.svg",
}: Props): JSX.Element => {
  return (
    <div className={`divider ${className}`}>
      <img className="vector" alt="Vector" src={vector} />
    </div>
  );
};