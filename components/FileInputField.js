import blobToBase64 from "@/util/blobToBase64";
import React, { forwardRef } from "react";

const FileInputField = forwardRef(({setCv}, ref) => {
  const onChangeFile = async (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (!file) return; // Ensure a file is selected

    const blob = new Blob([file], { type: file.type }); // Create a Blob from the file
    const pdfUrl = URL.createObjectURL(blob); // Create object URL
    const base64ConvertedUrl = await blobToBase64(blob); // Convert Blob to Base64
    setCv(base64ConvertedUrl);
  };

  return (
    <label style={{ cursor: "pointer", fontSize: 13 }}>
      Upload CV:
      <input
        ref={ref}
        type="file"
        accept="application/pdf"
        onChange={onChangeFile}
      />
    </label>
  );
});

export default FileInputField;
