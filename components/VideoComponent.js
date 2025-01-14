import React, { forwardRef, useEffect } from "react";

const VideoComponent = forwardRef(({hasStarted}, ref) => {
  const turnOnCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (ref.current) {
          ref.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing the camera: ", error);
      });
  };

  useEffect(() => {
    if(hasStarted){
        turnOnCamera();
    }
  }, [ref, hasStarted]);

  //if(!ref && !hasStarted) return null;

  return (
    <video
      style={{
        width: "20%",
        height: "auto",
        border: "1px solid #ccc",
      }}
      ref={ref}
      autoPlay={hasStarted}
      //className={styles.video}
    ></video>
  );
});

export default VideoComponent;
