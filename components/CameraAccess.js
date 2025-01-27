import { forwardRef, useState } from "react";
import Button from "./Button";
import styles from "./CameraAccess.module.css";
import ErrorIndicator from "./ErrorIndicator";
import { useCameraContext } from "@/contexts/CameraContext";

const CameraAccessInstruction = forwardRef(
  ({ isLoading, setIsLoading, onClose, setHasGivenPermissionForCamera }, ref) => {
    const { videoRef } = useCameraContext();
    const [hasCameraTurnedOn, setHasCameraTurnedOn] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState(null);

    const startCamera = async () => {
      try {
        navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            if (videoRef.current) {
              videoRef.current.srcObject = stream;
              setHasCameraTurnedOn(true);
              setHasGivenPermissionForCamera(true);
            }
          })
          .catch((error) => {
            console.error("Error accessing the camera: ", error);
          });
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    const turnOnCamera = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: "camera",
        });

        if (permissionStatus.state === "granted") {
          await startCamera();
        } else if (permissionStatus.state === "prompt") {
          await navigator.mediaDevices.getUserMedia({ video: true });
          await startCamera();
        } else if (permissionStatus.state === "denied") {
          setShowErrorMessage(true);
          setMessage(
            "Camera access has been denied. Please enable camera permissions in your browser settings to proceed."
          );

          setTimeout(() => {
            setShowErrorMessage(false);
            setMessage(null);
          }, 3000);
        }
      } catch (error) {
        console.error("Error checking camera permission: ", error);
      }
    };

    return (
      <>
        {showErrorMessage && (
          <ErrorIndicator
            showErrorMessage={showErrorMessage}
            msgText={message}
          />
        )}
        <div className={styles.backDropContainer}>
          <div className={styles.instructionsBox}>
            <h3>Camera Adjustment</h3>
            <div className={styles.instructions}>
              <video
                style={{
                  width: "100%",
                  height: "auto",
                  border: "1px solid #ccc",
                }}
                ref={videoRef}
                autoPlay
              ></video>
            </div>
            {!hasCameraTurnedOn ? (
              <Button onClick={turnOnCamera} isFor="next">
                Turn On Camera
              </Button>
            ) : (
              <Button onClick={onClose} isFor="next">
                Next
              </Button>
            )}
          </div>
        </div>
      </>
    );
  }
);

export default CameraAccessInstruction;
