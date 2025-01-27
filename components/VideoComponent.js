import React, { forwardRef, useEffect, useState } from "react";
import styles from './VideoComponent.module.css'

const VideoComponent = forwardRef(({hasStarted, hasMeetingEnded}, ref) => {
  const [stream, setStream] = useState(null);

  const turnOffCamera= ()=>{
    if (stream) {
      stream.getTracks().forEach((track) => track.stop()); // Stop each track
      if (ref.current) {
        ref.current = null; // Clear video source
      }
      setStream(null); // Clear the stream state
    }
  }

  const turnOnCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (ref.current) {
          ref.current.srcObject = stream;
          setStream(stream);
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
    if(hasMeetingEnded){
      turnOffCamera();
    }
  }, [ref, hasStarted, hasMeetingEnded]);

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
      //className={styles.cameraVideo}
    ></video>
  );
});

export default VideoComponent;
