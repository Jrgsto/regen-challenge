import React from "react";

interface IButton {
  onClick: () => void;
  children: JSX.Element | JSX.Element[];
  disabled?: boolean;
}
export const Button = ({
  onClick,
  children,
  disabled = false,
}: IButton): JSX.Element => {
  return (
    <button
      className={`bg-green-400 rounded-md shadow-sm p-8 md:p-4 hover:cursor-pointer hover:shadow-lg w-full ${
        disabled ? "opacity-40" : ""
      }`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
