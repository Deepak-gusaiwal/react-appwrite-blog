import React from "react";

const FileInput = ({
  label,
  className = "",
  register,
  errors,
  name,
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
        type="file"
        className={`w-full py-1 px-2 rounded shadow ${className}`}
        {...register(name)}
        {...props}
      />

      {errors[name] && (
        <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default FileInput;
