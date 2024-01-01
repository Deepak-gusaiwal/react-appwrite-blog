import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder,
  className = "",
  register,
  errors,
  name,
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
        id={name}
        type={type}
        placeholder={placeholder}
        className={`w-full py-1 px-2 rounded shadow ${className}`}
        {...register(name)}
        readOnly={readOnly}
        {...props}
        
      />

      {errors[name] && (
        <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default Input;
