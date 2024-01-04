import React from "react";

const ErrorTxt = ({ children, className = "" }) => {
  return <p className={`text-red-500 text-[12px] ${className}`}>{children}</p>;
};

export default ErrorTxt;
