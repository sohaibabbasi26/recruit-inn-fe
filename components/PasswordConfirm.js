import styles from "./PasswordConfirm.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import ShowPassword from "./ShowPassword";


const   PasswordConfirm = ({
  error,
  setPassword,
  password,
  pass,
  setPass,
  confirmPassword,
  setConfirmPasswword,
  handlePasswordChange,
  handleConfirmPasswordChange,
  candName,
}) => {
  // const [confirmPassword,setConfirmPassword] = useState(null);
  // const [pass,setPass] = useState(null);

  //     const handlePasswordChange = (e) => {
  //     setPass(e.target.value);
  //     setError('');
  //   };

  //   const handleConfirmPasswordChange = (e) => {
  //     setConfirmPassword(e.target.value);
  //     setError('');
  //   };
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    const checkPassword = () => {
      if (pass === confirmPassword) {
        setPass(pass);
      }
    };
    checkPassword();
  }, [confirmPassword]);

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.banner}>
          <div className={styles.leftContainer}>
            <Image src="/successIndicator.svg" width={90} height={90} />
            <p className="passwordhead">
              Welcome Abroad {candName ? candName : "."}{" "}
            </p>
          </div>
          <div className={styles.imgDiv}>
            <Image src="/Element.png" width={90} height={90} />
          </div>
        </div>

        <div className={styles.inputFieldContainer}>
          <div className={styles.inputField}>
            <Image src="/password.svg" width={25} height={25} />
            <input
              placeholder="Set Password"
              type={showPassword ? "text" : "password"}
              onChange={handlePasswordChange}
            />
            <ShowPassword pass={showPassword} setPass={setShowPassword} />
          </div>
          <div className={styles.inputField}>
            <Image src="/password.svg" width={25} height={25} />
            <input
              placeholder="Confirm Password"
              onChange={handleConfirmPasswordChange}
              type={showPassword ? "text" : "password"}
            />
          
            <ShowPassword pass={showPassword} setPass={setShowPassword} />
          </div>
        </div>
        {error ? (
          <>
            <p>Please enter a new password</p>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default PasswordConfirm;
