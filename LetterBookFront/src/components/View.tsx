import React from "react";
import { useReducer } from "react";
import "./style/View.css";

interface Props {
  size: "forty-eight";
  theme: "active" | "hover";
  className: any;
}

export const View = ({ size, theme, className }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    size: size || "forty-eight",
    theme: theme || "hover",
  });

  return (
    <div
      className={`view theme-${state.theme} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      <img
        className="exclude"
        alt="Exclude"
        src={
          state.theme === "active"
            ? "https://c.animaapp.com/0oQKf5qO/img/exclude-1.svg"
            : "https://c.animaapp.com/0oQKf5qO/img/exclude-2.svg"
        }
      />
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "click":
      return {
        ...state,
        theme: "active",
      };
  }
  return state;
}
