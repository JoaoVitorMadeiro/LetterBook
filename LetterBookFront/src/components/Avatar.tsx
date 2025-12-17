import React from "react";
import { useReducer } from "react";
import { Person } from "./Person"; // Assuming Person component exists or needs to be created
import "./style/Avatar.css";

interface Props {
  hover?: boolean;
  usernameSide?: boolean;
  usernameBottom?: boolean;
  size: "medium" | "small";
  stateProp: "hover" | "default";
  className: any;
  personSizeThemeFilledClassName: any;
}

export const Avatar = ({
  hover = false,
  usernameSide = true,
  usernameBottom = true,
  size,
  stateProp,
  className,
  personSizeThemeFilledClassName,
}: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    size: size || "small",
    state: stateProp || "default",
  });

  return (
    <div
      className={`avatar ${state.size} state-${state.state} ${className}`}
      onMouseEnter={() => {
        dispatch("mouse_enter");
      }}
      onMouseLeave={() => {
        dispatch("mouse_leave");
      }}
    >
      <Person
        className={personSizeThemeFilledClassName}
        img={
          state.state === "default" && state.size === "medium"
            ? "https://c.animaapp.com/0oQKf5qO/img/person-3.svg"
            : undefined
        }
        size={state.size === "medium" ? "twenty-four" : "sixteen"}
        sizeThemeFilled={
          state.state === "default" && state.size === "small"
            ? "https://c.animaapp.com/0oQKf5qO/img/person-2.svg"
            : undefined
        }
        theme="filled"
      />
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "mouse_enter":
      return {
        ...state,
        state: "hover",
      };
    case "mouse_leave":
      return {
        ...state,
        state: "default",
      };
  }
  return state;
}
