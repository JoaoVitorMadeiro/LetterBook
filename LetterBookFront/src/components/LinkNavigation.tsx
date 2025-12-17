import React from "react";
import "./style/LinkNavigation.css";

interface Props {
  linkLabel: string;
  className: any;
  divClassName: any;
}

export const LinkNavigation = ({
  linkLabel = "Link",
  className,
  divClassName,
}: Props): JSX.Element => {
  return (
    <div className={`link-navigation ${className}`}>
      <div className={`text-wrapper ${divClassName}`}>{linkLabel}</div>
    </div>
  );
};