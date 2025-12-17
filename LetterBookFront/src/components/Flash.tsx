import React from "react";
import "./style/Flash.css";

interface Props {
  size: "twenty";
  theme: "filled";
  className: any;
}

export const Flash = ({ size, theme, className }: Props): JSX.Element => {
  return (
    <img
      className={`flash ${className}`}
      alt="Size theme filled"
      src="https://c.animaapp.com/0oQKf5qO/img/flash.svg"
    />
  );
};