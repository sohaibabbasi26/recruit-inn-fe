import { useEffect, useRef } from "react";
import styles from "./CandidateVerify.module.css";
import Image from "next/image";

const CandidateVerify = ({
  otp,
  setOtp,
  isCodeInvalid,
  sendEmail,
  email,
  setMessage,
  showSuccess,
}) => {
  const otpRef = useRef(null);

  useEffect(() => {
    // element
    const element = otpRef.current;

    const handleClick = (event) => {
      let paste = event.clipboardData.getData("text/plain");
      let activeElement = document.activeElement;
      const pasteArray = paste.split("");

      if (pasteArray && pasteArray.length === otp.length)
        setOtp((prevOtpArray) =>
          prevOtpArray.map((prevOtp, index) => (prevOtp = pasteArray[index]))
        );
    };

    // Add event on first child node of element (first input)
    element.firstChild.addEventListener("paste", handleClick);

    // Remove the event listener when the component unmounts
    return () => {
      element.firstChild.removeEventListener("paste", handleClick);
    };
  }, [otp]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // focus Next sibling
    if (element.value)
      if (element.nextSibling) {
        element.nextSibling.focus();
      }

    // focus Prev sibling
    if (!element.value)
      if (element.previousSibling) element.previousSibling.focus();
  };

  return (
    <>
      <div className={styles.coverContainer}>
        <div className={styles.banner}>
          <div className={styles.leftContainer}>
            <h2>Enter Verification Code</h2>
            <p>Enter the 6-digit verification</p>
            <p>
              send to <span>{email}</span>
            </p>

            <div ref={otpRef} className={styles.otpContainer}>
              {/* <input />
                            <input />
                            <input />
                            <input />
                            <input />   
                            <input /> */}
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>
            {/* {isCodeInvalid && <p style={{ color: 'red' }}>Invalid code entered. Please try again.</p>} */}

            <p id={styles.margin}>
              Didn't receive the code?{" "}
              <span
                onClick={() => {
                  sendEmail(email);
                  setMessage("An email has been sent again!");
                  showSuccess();
                }}
              >
                {" "}
                Resend code{" "}
              </span>
            </p>
          </div>

          <div className={styles.imageDiv}>
            <Image src="/Element.png" width={160} height={160} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateVerify;
