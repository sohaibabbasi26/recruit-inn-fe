import styles from "./RightBottomBtns.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const LoginBtns = ({
  loginApiCall,
  email,
  setEmail,
  showError,
  setShowErrorMessage,
  password,
  setPassword,
  onContinue,
  setCompletedStages,
  completedStages,
  onClose,
}) => {
  // const [emailError, setEmailError] = useState('');
  // const [passwordError, setPasswordError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    let isValid = true;
    // Validate email
    if (!email?.trim()) {
      //("email checking   ...");
      showError("Email is required");
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      showError("Invalid email format");
      isValid = false;
    }

    // Validate password
    if (!password?.trim()) {
      showError("Password is required");
      isValid = false;
    }

    return isValid;
  };

  const navigationIconSize = 30;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Proceed with form submission
      loginApiCall();
      // You can send your request to the server here
    }
  };


  const clickBackHandler = () => {
    router.push('/');
    // router.back();
}

  return (
    <>
      <div className={styles.btnsContainer}>
        <button id={styles.backBtn} onClick={clickBackHandler}>
          <Image
            src="/backward.svg"
            width={navigationIconSize + 10}
            height={navigationIconSize + 10}
          />
          Back
        </button>
        <button id={styles.forwardBtn} onClick={handleSubmit}>
          Continue <Image src="/Forward.svg" width={25} height={25} />
        </button>
      </div>
    </>
  );
};

export default LoginBtns;
