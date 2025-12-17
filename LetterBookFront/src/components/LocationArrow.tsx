import React from "react";
import "./style/LocationArrow.css";

interface Props {
  size: "twenty-eight";
  theme: "filled";
  className: any;
}

export const LocationArrow = ({
  size,
  theme,
  className,
}: Props): JSX.Element => {
  return (
    <img
      className={`location-arrow ${className}`}
      alt="Size theme filled"
      src="https://c.animaapp.com/0oQKf5qO/img/location-arrow.svg"
    />
  );
};