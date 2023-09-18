import React from "react";

interface ButtonProps {
  name: string;

  onClick: () => void;
}

const Button = ({ name, onClick }: ButtonProps) => {
  return (
    <button
      className="inline-flex items-center px-9 py-2 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-teal-500 hover:bg-teal-700 focus:outline-none focus:ring-offset-2 focus:ring-teal-500 mr-2"
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default Button;
