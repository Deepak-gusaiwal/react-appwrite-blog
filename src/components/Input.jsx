import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  readOnly = false,
  ...props
}) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="capitalize" htmlFor={label}>
          {label} :
        </label>
      )}
      <input
        id={label}
        type={type}
        placeholder={placeholder}
        className={`w-full py-1 px-2 rounded shadow ${className}`}
        readOnly={readOnly}
        {...props}
      />

    </div>
  );
};

export default Input;
