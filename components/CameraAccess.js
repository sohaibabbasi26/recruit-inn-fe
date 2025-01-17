import { forwardRef, useState } from "react";
import Button from "./Button";
import styles from "./CameraAccess.module.css";
import ErrorIndicator from "./ErrorIndicator";

const CameraAccessInstruction = forwardRef(
  ({ isLoading, setIsLoading, onClose }, ref) => {
    const [hasCameraTurnedOn, setHasCameraTurnedOn] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message, setMessage] = useState(null);

    const startCamera = async () => {
      try {
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
        setHasCameraTurnedOn(true);
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    const requestCameraAccess = async () => {
      try {
        // Request camera access explicitly
        await navigator.mediaDevices.getUserMedia({ video: true });
        console.log("Camera permission granted.");
        await startCamera(); // Turn on the camera after permission is granted
      } catch (error) {
        console.error("User denied camera access: ", error);
      }
    };

    const turnOnCamera = async () => {
      try {
        // Check the current status of the camera permission
        const permissionStatus = await navigator.permissions.query({
          name: "camera",
        });

        if (permissionStatus.state === "granted") {
          // If permission is already granted, turn on the camera
          await startCamera();
        } else if (permissionStatus.state === "prompt") {
          // If permission is not yet decided, request permission
          await requestCameraAccess();
        } else if (permissionStatus.state === "denied") {
          // If permission is denied, show a user-friendly message
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
          {/* {isLoading ? (
          <>
            <div className={styles.loader}></div>
            <h2>
              Assessment is being prepared, make sure to read all the
              instructions before starting it!
            </h2>
          </>
        ) : ( */}
          <div className={styles.instructionsBox}>
            <h3>Camera Adjustment</h3>
            <div className={styles.instructions}>
              <video
                style={{
                  width: "100%",
                  height: "auto",
                  border: "1px solid #ccc",
                }}
                ref={ref}
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
          {/* )} */}
        </div>
      </>
    );
  }
);

export default CameraAccessInstruction;
