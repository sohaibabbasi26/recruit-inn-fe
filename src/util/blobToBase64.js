export default function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
      const base64data = reader.result.split(",")[1];
      //("Converted Base64 Length:", base64data.length);
      resolve(base64data);
    };
    reader.onerror = reject;
  });
}
