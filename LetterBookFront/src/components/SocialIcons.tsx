import React from "react";
import "./style/SocialIcons.css";

interface Props {
  platform: "facebook" | "tik-tok" | "instagram";
  color: "original";
  className: any;
  platformInstagram: string;
}

export const SocialIcons = ({
  platform,
  color,
  className,
  platformInstagram = "https://c.animaapp.com/0oQKf5qO/img/platform-instagram--color-original.png",
}: Props): JSX.Element => {
  return (
    <img
      className={`social-icons ${className}`}
      alt="Platform tiktok"
      src={
        platform === "instagram"
          ? platformInstagram
          : platform === "facebook"
            ? "https://c.animaapp.com/0oQKf5qO/img/platform-facebook--color-original.svg"
            : "https://c.animaapp.com/0oQKf5qO/img/platform-tiktok--color-original.svg"
      }
    />
  );
};
