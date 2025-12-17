import React from "react";
import { useReducer } from "react";
import { Search } from "./Search"; // Assuming Search component exists or needs to be created
import "./style/SearchBar.css";

interface Props {
  stateProp: "active" | "default";
  className: any;
}

export const SearchBar = ({ stateProp, className }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {
    state: stateProp || "default",
  });

  return (
    <div
      className={`search-bar ${state.state} ${className}`}
      onClick={() => {
        dispatch("click");
      }}
    >
      {state.state === "default" && (
        <div className="frame">
          <Search
            className="search-instance"
            size="twenty-four"
            theme="filled"
          />
        </div>
      )}

      {state.state === "active" && (
        <>
          <div
            className="dismiss"
            onClick={() => {
              dispatch("click_206");
            }}
          />

          <div className="search-wrapper">
            <Search
              className="search-instance"
              size="twenty-four"
              theme="filled"
            />
          </div>
        </>
      )}
    </div>
  );
};

function reducer(state: any, action: any) {
  switch (action) {
    case "click":
      return {
        ...state,
        state: "active",
      };

    case "click_206":
      return {
        ...state,
        state: "default",
      };
  }
  return state;
}
