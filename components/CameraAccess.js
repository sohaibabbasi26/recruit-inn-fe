import { forwardRef, useState } from "react";
import Button from "./Button";
import styles from "./CameraAccess.module.css";

const CameraAccessInstruction = forwardRef(
  ({ isLoading, setIsLoading, onClose }, ref) => {
    const [hasCameraTurnedOn, setHasCameraTurnedOn] = useState(false);
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
        setHasCameraTurnedOn(true);
    };

    return (
      <div className={styles.backDropContainer}>
        {isLoading ? (
          <>
            <div className={styles.loader}></div>
            <h2>
              Assessment is being prepared, make sure to read all the
              instructions before starting it!
            </h2>
          </>
        ) : (
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
        )}
      </div>
    );
  }
);

export default CameraAccessInstruction;
