import React from "react";

const Button = ({ children, className = "", type = "button",loading=false, ...props}) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 capitalize flex font-semibold ${className}`}
      {...props}
    >
      {children} {loading && "..."}
    </button>
  );
};

export default Button;
