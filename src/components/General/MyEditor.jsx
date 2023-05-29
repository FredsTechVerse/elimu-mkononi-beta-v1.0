import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function MyEditor() {
  const [content, setContent] = useState("");
  const handleContentChange = (value) => {
    setContent(value);
    console.log(content);
    console.log(typeof content);
  };

  const handleEditorFocus = () => {
    console.log("Editor focused");
  };

  const handleEditorBlur = () => {
    console.log("Editor blurred");
  };

  return (
    <ReactQuill
      value={content}
      onChange={handleContentChange}
      onFocus={handleEditorFocus}
      onBlur={handleEditorBlur}
      readOnly={false}
      theme="snow"
    />
  );
}

export default MyEditor;
