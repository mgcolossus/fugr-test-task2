import React from "react";

interface Props extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {}

export const Button: React.FC<Props> = (props) => {
  return (
    <button {...props} className="button-component">
      {props.children}
    </button>
  );
};

