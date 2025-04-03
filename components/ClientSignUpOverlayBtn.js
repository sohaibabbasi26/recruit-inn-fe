// import Router from 'next/router';
import styles from "./RightBottomBtns.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const ClientSignUpOverlayBtn = ({
  password,
  confirmPassword,
  validatephoneReceiver,
  email,
  fillValidity,
  validateNameReceiver,
  validateEmailReceiver,
  showError,
  showSuccess,
  setMessage,
  onContinue,
  onBack,
  setCompletedStages,
  completedStages,
  onClose,
  handleFormSubmit,
}) => {
  const router = useRouter();

  const onAddClientHandler = async () => {
    if (!fillValidity()) {
      setMessage("Fill all the fields");
      showError();
      //("in fill validatity!");
      return;
    }
    if (
      !/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-])[A-Za-z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/.test(
        password
      )
    ) {
      //("in password length check!");
      setMessage(
        "Password must contain at least one capital letter, one number, and one special character."
      );
      showError();
      return;
    }
    if (!validateNameReceiver()) {
      setMessage("Please enter a valid name");
      showError();

      return;
    }
    if (!validateEmailReceiver()) {
      setMessage("Please enter a valid email address");
      showError();
      //("in email validatity!");

      return;
    }
    if (!validatephoneReceiver()) {
      setMessage("Please enter a valid Contact number");
      showError();

      return;
    }

    if (password !== confirmPassword) {
      //("in password validity!");
      setMessage("Passwords doesn't match");
      showError();
      return;
    }
    //("butonnnif");

    await handleFormSubmit();
    onClose();
  };

  const navigationIconSize = 30;
  const iconSize = 20;

  const clickBackHandler = () => {
    router.push("/");
  };

  return (
    <>
      <div className={styles.btnsContainer}>
        <button id={styles.backBtn} onClick={clickBackHandler}>
          <Image
            src="/backward.svg"
            width={navigationIconSize}
            height={navigationIconSize}
          />
          Back
        </button>
        <button id={styles.forwardBtn} onClick={onAddClientHandler}>
          Add Client{" "}
          <Image src="/addsign.svg" width={iconSize} height={iconSize} />
        </button>
      </div>
    </>
  );
};

export default ClientSignUpOverlayBtn;
