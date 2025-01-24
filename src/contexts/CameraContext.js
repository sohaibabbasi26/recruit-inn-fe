import { createContext, useContext, useState, useRef } from "react";

const CameraContext = createContext();

export const CameraProvider = ({ children }) => {
  const videoRef = useRef(null);

  const turnOffCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  return (
    <CameraContext.Provider value={{ videoRef, turnOffCamera }}>
      {children}
    </CameraContext.Provider>
  );
};

export const useCameraContext = () => useContext(CameraContext);
