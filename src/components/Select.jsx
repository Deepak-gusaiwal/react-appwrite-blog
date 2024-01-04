import React from "react";

const Select = ({ label, className = "", options = [], ...props }) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="capitalize" htmlFor={label}>
          {label} :
        </label>
      )}
      <select
        className={`bg-gray-100 border-2 border-gray-400 py-1 px-2 rounded ${className} ml-2`}
        {...props}
        id={label}
      >
        <option defaultChecked value="">
          --select status---
        </option>
        {options.map((option) => {
          return (
            <option key={option} value={option.toLowerCase()}>
              {option.toUpperCase()}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default Select;
