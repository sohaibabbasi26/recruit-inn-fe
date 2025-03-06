import blobToBase64 from "@/util/blobToBase64";
import React, { forwardRef, useState, useEffect } from "react";
import styles from "./FileInputField.module.css";

const FileInputField = forwardRef(({ setCv, cv, fileName, setFileName }, ref) => {
  // Load filename when component mounts
  useEffect(() => {
    if (cv) {
      // If you need to extract filename from base64 string (not recommended)
      // const match = cv.match(/filename=([^;]+)/);
      // if (match) setFileName(match[1]);
      
      // Better to use the stored filename from parent
      setFileName(fileName);
    }
  }, [cv]);

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    setFileName(file.name);
    const blob = new Blob([file], { type: file.type });
    const base64ConvertedUrl = await blobToBase64(blob);
    setCv(base64ConvertedUrl);
  };

  return (
    <div className={`${styles.infoField}`}>
      <label className={styles.fileInputLabel}>
        {fileName || "Upload CV"}
        <input
          ref={ref}
          type="file"
          accept="application/pdf"
          onChange={onChangeFile}
          className={styles.hiddenFileInput}
        />
      </label>
    </div>
  );
});

export default FileInputField;