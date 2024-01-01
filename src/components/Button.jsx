import React from "react";

const Button = ({
  children,
  className = "",
  type = "button",
  loading = false,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`py-2 px-4 rounded bg-blue-500 hover:bg-blue-600 capitalize flex justify-center items-center gap-2 font-semibold ${className}`}
      {...props}
    >
      {children}{" "}
      {loading && (
        <div className="flex items-center justify-center space-x-2 animate-bounce">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </button>
  );
};

export default Button;
