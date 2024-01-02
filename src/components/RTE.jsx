import React from "react";
import ReactQuill from "react-quill";

const RTE = ({
  label,
  name,
  errors,
  className = "",
  setValue,
  defaultValue = "",
}) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="capitalize" htmlFor={label}>
          {label} :
        </label>
      )}
      <ReactQuill
        defaultValue={defaultValue}
        className={`${className}`}
        onChange={(value) => {
          setValue(name, value);
        }}
        modules={{
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["image", "link", "code-block"],
            ["clean"],
          ],
        }}
      />

      {errors[name] && (
        <p className="text-red-500 text-[12px]">{errors[name]?.message}</p>
      )}
    </div>
  );
};

export default RTE;
