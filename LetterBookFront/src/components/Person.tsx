import React from "react";
import "./style/Person.css";

interface Props {
  size: "sixteen" | "twenty-four";
  theme: "filled";
  className: any;
  img?: string;
  sizeThemeFilled?: string;
}

export const Person = ({
  size,
  theme,
  className,
  img,
  sizeThemeFilled,
}: Props): JSX.Element => {
  const src =
    img ||
    (size === "twenty-four" && theme === "filled"
      ? "https://c.animaapp.com/0oQKf5qO/img/person-3.svg"
      : "https://c.animaapp.com/0oQKf5qO/img/person-2.svg");

  return (
    <img
      className={`person ${className}`}
      alt="Person"
      src={src}
    />
  );
};
