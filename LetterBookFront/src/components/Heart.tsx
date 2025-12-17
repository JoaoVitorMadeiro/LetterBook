import React from "react";
import "./style/Heart.css";

interface Props {
  size: "twelve" | "forty-eight";
  theme: "relax" | "active-hover" | "active" | "hover";
  className: any;
  sizeThemeRelax: string;
}

export const Heart = ({
  size,
  theme,
  className,
  sizeThemeRelax = "https://c.animaapp.com/0oQKf5qO/img/size-48--theme-relax.svg",
}: Props): JSX.Element => {
  return (
    <img
      className={`heart ${size} ${className}`}
      alt="Size theme active"
      src={
        theme === "relax"
          ? sizeThemeRelax
          : theme === "active-hover"
            ? "https://c.animaapp.com/0oQKf5qO/img/size-12--theme-active-hover.svg"
            : theme === "hover"
              ? "https://c.animaapp.com/0oQKf5qO/img/size-48--theme-hover.svg"
              : "https://c.animaapp.com/0oQKf5qO/img/heart-2.svg"
      }
    />
  );
};