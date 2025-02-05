import { useRouter } from "next/router";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import LoginOverlay from "../../components/LoginOverlay";
import AdminLoginOverlay from "../../components/AdminLoginOverlay";

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [message, setMessage] = useState();

  const stages = {
    LOG_IN: "LOG_IN",
  };

  const stageHeadings = {
    LOG_IN: "Login",
  };

  const loginApiCall = async () => {
    console.log("URL:", `${process.env.NEXT_PUBLIC_REMOTE_URL}/admin-log-in`);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_REMOTE_URL}/admin-log-in`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        }),
      }
    );

    const data = await response.json();
    if (data?.data?.token) {
      // Cookie
      const expiresIn = 10 * 60 * 60;
      const expiresDate = new Date(Date.now() + expiresIn * 1000);
      document.cookie = `loginToken=${
        data?.data?.token
      }; expires=${expiresDate.toUTCString()}; path=/; ${
        process.env.NODE_ENV === "production" ? "Secure; " : ""
      }SameSite=Strict`;

      localStorage.setItem("admin-token", data?.data?.token);
      router.push(`/admin-dashboard`);
    } else {
      alert("Login failed. Please check your credentials.");
    }
  };
  console.log("NODE ENV", process.env.NODE_ENV);

  const showError = (message) => {
    setShowErrorMessage(true);
    setMessage(message);
    setTimeout(() => {
      setShowErrorMessage(false);
    }, 3000);
  };

  const showSuccess = (message) => {
    setShowSuccessMessage(true);
    setMessage(message);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const showOverlay = true;

  return (
    <div className="routes-wrapper">
      <AdminLoginOverlay
        setMessage={setMessage}
        showError={showError}
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        loginApiCall={loginApiCall}
        stageHeadings={stageHeadings}
        stages={stages}
        showOverlay={showOverlay}
      />
    </div>
  );
};

export default AdminLogin;
