import React from "react";
import { Editor } from "@tinymce/tinymce-react";
const RTE = ({ label, className = "", ...props }) => {
  return (
    <div className="mb-2">
      {label && (
        <label className="capitalize" htmlFor={label}>
          {label} :
        </label>
      )}
      <Editor
        {...props}
        className={`${className}`}
        apiKey="your-api-key"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          forced_root_block: "p",
        }}
      />
    </div>
  );
};

export default RTE;
