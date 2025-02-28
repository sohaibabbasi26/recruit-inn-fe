import blobToBase64 from "@/util/blobToBase64";
import React, { forwardRef, useState } from "react";
import styles from "./FileInputField.module.css"; // Ensure correct import of CSS

const FileInputField = forwardRef(({ setCv }, ref) => {
  const [fileName,setFileName]= useState(null);

  const onChangeFile = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("no file upload");
      return;
    }
    setFileName(file.name);
    const blob = new Blob([file], { type: file.type });
    const base64ConvertedUrl = await blobToBase64(blob);
    setCv(base64ConvertedUrl);
  };

  return (
    <div className={`${styles.infoField}`}>
      {/* <Image src="/upload.svg" alt="Upload" width={20} height={20} /> */}
      <label className={styles.fileInputLabel}>
        {
          fileName??"Upload CV" 
        }
        <input
          ref={ref}
          type="file"
          title={fileName??"Upload CV"}
          accept="application/pdf"
          onChange={onChangeFile}
          className={styles.hiddenFileInput}
        />
      </label>
    </div>
  );
});

export default FileInputField;
