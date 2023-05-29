import React, { useState } from "react";

const QuillEditorStudent = ({ value }) => {
  const text =
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi nihil recusandae eaque, facilis incidunt est a modi magnam qui doloribus?";
  return (
    <div id="unit content" className="w-full h-full rounded-md">
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
};

export default QuillEditorStudent;
