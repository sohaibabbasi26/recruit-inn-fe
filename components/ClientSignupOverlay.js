import { useState } from "react";
import styles from "./Overlay.module.css";
import Image from "next/image";
import Stages from "./Stages";
import AddSkillForm from "./AddSkillForm";
import RightBottomBtns from "./RightBottomBtns";
import JobType from "./JobType";
import JobTypeBtns from "./JobTypeBtns";
import AIassessment from "./AIassesment";
import AssessmentBtns from "./AssessmentBtns";
import ShareLink from "./ShareLink";
import { useRouter } from "next/router";
import ShareLinkBtns from "./ShareLinkBtns";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import ClientInfo from "./ClientInfo";
import AdminOverlayBtns from "./AdminOverlayBtns";
import ErrorIndicator from "./ErrorIndicator";
import ClientSignUpOverlayBtn from "./ClientSignUpOverlayBtn";

// const ClientSignUpOverlay = ({
//   adminToken,
//   message,
//   showError,
//   showErrorMessage,
//   showSuccess,
//   setMessage,
//   showOverlay,
//   onClose,
//   stages,
//   stageHeadings,
// }) => {
//   console.log("stage headings:".stageHeadings);
//   const overlayRef = useRef(null);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     if (showOverlay) {
//       gsap.to(overlayRef.current, {
//         y: "0%",
//         opacity: 1,
//         duration: 0.3,
//         ease: "power2.out",
//       });
//     } else {
//       gsap.to(overlayRef.current, {
//         y: "100%",
//         opacity: 0,
//         duration: 0.3,
//         ease: "power2.in",
//         onComplete: onClose,
//       });
//     }

//     return () => {
//       gsap.to(overlayRef.current, {
//         y: "100%",
//         opacity: 0,
//         duration: 0.1,
//         ease: "power1",
//       });
//     };
//   }, []);

//   const router = useRouter();
//   const infoSymbolSize = 20;
//   const [currentStage, setCurrentStage] = useState(stages.CLIENT_INFO);
//   const [completedStages, setCompletedStages] = useState([]);
//   const [clientname, setClientname] = useState(null);
//   const [companyname, setCompanyname] = useState(null);
//   const [email, setEmail] = useState(null);
//   const [phoneNo, setPhoneNo] = useState(null);
//   const [actManager, setActManager] = useState(null);
//   const [companySize, setCompanySize] = useState(null);
//   const [password, setpassword] = useState(null);
//   const [conformpassword, setconfirmpassword] = useState(null);
//   const [city, setCity] = useState(null);
//   const [country, setCountry] = useState(null);
//   const [companyId, setCompanyId] = useState(null);
//   const [text, setText] = useState(null);
//   const [subject, setSubject] = useState(null);
//   const [isLoading, setisLoading] = useState(false);
//   const [linkk, setLink] = useState();
//   const [checkkClient, setCheckClient] = useState();

//   const validateEmailReceiver = () => {
//     if (!email || !isValidEmail(email)) {
//       setMessage("Please enter a valid email address.");
//       showError();
//       return false;
//     }
//     return true;
//   };

//   const isValidEmail = (email) => {
//     const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//     return regex.test(email);
//   };

//   const fillValidity = () => {
//     return (
//       companyname &&
//       companySize &&
//       phoneNo &&
//       actManager &&
//       password &&
//       conformpassword &&
//       country &&
//       city &&
//       clientname &&
//       email
//     );
//   };

//   let link;
//   useEffect(() => {
//     setCurrentStage(stages.CLIENT_INFO);
//   }, []);

//   useEffect(() => { }, [companyId, email]);

//   useEffect(() => {
//     if (companyId && email) {
//       const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
//       const emailSubject = "RECRUITINN: SET UP YOUR PASSWORD";
//       const emailText = `Follow the link to set up your new password: \n ${demolink}`;

//       const details = {
//         to: email,
//         subject: emailSubject,
//         text: emailText,
//       };

//       console.log("details:", details);

//       setEmail(email);
//       setSubject(emailSubject);
//       setText(emailText);
//     }
//   }, [companyId, email, subject, text]);

//   const getActiveComponent = () => {
//     const activeFlow = localStorage.getItem("activeFlow");
//     console.log("Current active flow:", activeFlow);
//     switch (activeFlow) {
//       case "Client":
//         router.push(`/client-login`);
//       case "Admin":
//         console.log("its an admin flow!!!!");
//       default:
//         return null;
//     }
//   };

//   // /check-client

//   const checkClient = async () => {
//     const requestBody = {
//       email: email
//     }
//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-client`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${adminToken}`,
//           },
//           body: JSON.stringify(requestBody),
//         }
//       );
//       const data = await response.json();
//       console.log('checking if client exists:', data);

//       // setCheckClient(data);
//       // console.log("state of check client:", checkkClient)
//       // if(data?.data?.message === null){
//       //   setMessage("Email you are registering with is already in use, try another one!")
//       //   showError()
//       //   return;
//       // }
//       // if (data?.data?.data) {
//       //   setMessage("Email you are registering with is already in use, try another one!");
//       //   showError();
//       //   // return
//       //   // return;
//       // }

//       return data;
//     }
//     catch (e) {
//       console.log(e)
//       setMessage("some expected error occurs")
//       showError();
//     }
//   }

//   // useEffect(() => {
//   //   if (message) {
//   //     showError();
//   //   }
//   // }, [message]);

//   const handleFormSubmit = async () => {



//     const requestBody = {
//       company_name: companyname,
//       company_location: city,
//       email: email,
//       password: password,
//       account_user_name: actManager,
//       contact_no: phoneNo,
//     };

//     const check = await checkClient();

//     if (check?.data?.message !== null) {
//       setMessage("Email you are registering with is already in use, try another one!");
//       showError();
//       return;
//     } else if (check?.data?.message === null) {
//       try {
//         setisLoading(true);
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-sign-up-admin`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${adminToken}`,
//             },
//             body: JSON.stringify(requestBody),
//           }
//         );
//         const data = await response.json();
//         console.log("login response:", data?.data?.data?.company_id);
//         setCompanyId(data?.data?.data?.company_id);
//         sendMail(data?.data?.data?.company_id);
//         setisLoading(false)
//         getActiveComponent();
//       } catch (error) {
//         console.error("Error submitting form:", error);
//         setMessage("Failed to process form submission.");
//         showError();
//         setisLoading(false);
//       } finally {
//         setisLoading(false);
//       }
//     }
//   };

//   const sendMail = async (companyId) => {
//     const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
//     const emailSubject = "RECRUITINN: SET UP YOUR PASSWORD";
//     const emailText = `Follow the link to set up your new password: \n ${demolink}`;

//     const reqBody = {
//       to: email,
//       subject: emailSubject,
//       text: emailText,
//     };

//     console.log("body data to be sent:", reqBody);

//     try {
//       const response = await fetch(
//         `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(reqBody),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send email");
//       }

//       const data = await response.text();
//       console.log("Email sent successfully:", data);
//       // setisLoading(false);
//     } catch (error) {
//       console.log("Error sending email:", error);
//       setisLoading(false);
//     }
//   };

//   return (
//     <>
//       <div ref={overlayRef} className={styles.parent}>
//         <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

//         <div className={styles.superContainer}>
//           <div className={styles.coverContainer}>
//             <div className={styles.topContainer}>
//               <h2>
//                 Personal Info
//               </h2>
//             </div>

//             <Stages
//               currentStage={currentStage}
//               stages={stages}
//               completedStages={completedStages}
//             />

//             {currentStage === stages.CLIENT_INFO && !isLoading && (
//               <>
//                 <ClientInfo
//                   email={email}
//                   setActManager={setActManager}
//                   setCity={setCity}
//                   setpassword={setpassword}
//                   setconfirmpassword={setconfirmpassword}
//                   setClientname={setClientname}
//                   setEmail={setEmail}
//                   setPhoneNo={setPhoneNo}
//                   country={country}
//                   setCountry={setCountry}
//                   setCompanySize={setCompanySize}
//                   setCompanyname={setCompanyname}
//                 />
//                 <div className={styles.wrapper}>
//                   <ClientSignUpOverlayBtn
//                     password={password}
//                     conformpassword={conformpassword}
//                     email={email}
//                     showError={showError}
//                     setMessage={setMessage}
//                     fillValidity={fillValidity}
//                     validateEmailReceiver={validateEmailReceiver}
//                     showSuccess={showSuccess}
//                     handleFormSubmit={handleFormSubmit}
//                     onClose={onClose}
//                     setCompletedStages={setCompletedStages}
//                     completedStages={completedStages}
//                   />
//                 </div>
//               </>
//             )}
//             {isLoading && <div className={styles.loader}></div>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClientSignUpOverlay;

const ClientSignUpOverlay = ({
  adminToken,
  message,
  showError,
  showErrorMessage,
  showSuccess,
  setMessage,
  showOverlay,
  onClose,
  stages,
  stageHeadings,
}) => {
  console.log("stage headings:".stageHeadings);
  const overlayRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (showOverlay) {
      gsap.to(overlayRef.current, {
        y: "0%",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    } else {
      gsap.to(overlayRef.current, {
        y: "100%",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      });
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showOverlay, onClose]);

  const router = useRouter();
  const infoSymbolSize = 20;
  const [currentStage, setCurrentStage] = useState(stages.CLIENT_INFO);
  const [completedStages, setCompletedStages] = useState([]);
  const [clientname, setClientname] = useState(null);
  const [companyname, setCompanyname] = useState(null);
  const [email, setEmail] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [actManager, setActManager] = useState(null);
  const [companySize, setCompanySize] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [city, setCity] = useState(null);
  const [country, setCountry] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [text, setText] = useState(null);
  const [subject, setSubject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [linkk, setLink] = useState();
  const [checkkClient, setCheckClient] = useState();

  const validateEmailReceiver = () => {
    if (!email || !isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      showError();
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const fillValidity = () => {
    return (
      companyname &&
      companySize &&
      phoneNo &&
      actManager &&
      password &&
      confirmPassword &&
      country &&
      city &&
      clientname &&
      email
    );
  };

  let link;
  useEffect(() => {
    setCurrentStage(stages.CLIENT_INFO);
  }, []);

  useEffect(() => {}, [companyId, email]);

  // useEffect(() => {
  //   if (companyId && email) {
  //     const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
  //     const emailSubject = "RECRUITINN: SET UP YOUR PASSWORD";
  //     const emailText = `Follow the link to set up your new password: \n ${demolink}`;

  //     const details = {
  //       to: email,
  //       subject: emailSubject,
  //       text: emailText,
  //     };

  //     console.log("details:", details);

  //     setEmail(email);
  //     setSubject(emailSubject);
  //     setText(emailText);
  //   }
  // }, [companyId, email, subject, text]);

  const getActiveComponent = () => {
    const activeFlow = localStorage.getItem("activeFlow");
    console.log("Current active flow:", activeFlow);
    switch (activeFlow) {
      case "Client":
        router.push(`/client-login`);
        return null;
      case "Admin":
        console.log("its an admin flow!!!!");
        return null;
      default:
        return null;
    }
  };

  const checkClient = async () => {
    const requestBody = {
      email: email,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/check-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      const data = await response.json();
      console.log("checking if client exists:", data);
      return data;
    } catch (e) {
      console.log(e);
      setMessage("some expected error occurs");
      showError();
      return null;
    }
  };

  const handleFormSubmit = async () => {
    try {
      setIsLoading(true);
      const requestBody = {
        company_name: companyname,
        company_location: city,
        email: email,
        password: password,
        account_user_name: actManager,
        contact_no: phoneNo,
      };

      const check = await checkClient();

      if (check?.data?.message !== null) {
        setMessage(
          "Email you are registering with is already in use, try another one!"
        );
        showError();
        setIsLoading(false);
        return;
      } else if (check?.data?.message === null) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_REMOTE_URL}/client-sign-up-admin`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${adminToken}`,
              },
              body: JSON.stringify(requestBody),
            }
          );
          const data = await response.json();
          console.log("login response:", data?.data?.data?.company_id);
          setCompanyId(data?.data?.data?.company_id);
          await sendMail(data?.data?.data?.company_id);
          setMessage("A client account for you has been created!");
          showSuccess()
          setIsLoading(false);
          // getActiveComponent();
          router.push('/client-login');
        } catch (error) {
          console.error("Error submitting form:", error);
          setMessage("Failed to process form submission.");
          showError();
          setIsLoading(false);
        }
      }
    }
    catch (err) {
      console.log("ERR:", err);
    }
  };

  const sendMail = async (companyId) => {
    const demolink = `https://app.recruitinn.ai/set-password/${companyId}`;
    const emailSubject = "RECRUITINN: SET UP YOUR PASSWORD";
    const emailText = `Follow the link to set up your new password: \n ${demolink}`;

    const reqBody = {
      to: email,
      subject: emailSubject,
      text: emailText,
    };

    console.log("body data to be sent:", reqBody);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_REMOTE_URL}/sendMail`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      const data = await response.text();
      console.log("Email sent successfully:", data);
    } catch (error) {
      console.log("Error sending email:", error);
      setIsLoading(false);
    }
  };


  return (
    <>
      <div ref={overlayRef} className={styles.parent}>
        <ErrorIndicator showErrorMessage={showErrorMessage} msgText={message} />

        <div className={styles.superContainer}>
          <div className={styles.coverContainer}>
            <div className={styles.topContainer}>
              <h2>Personal Info</h2>
            </div>

            <Stages
              currentStage={currentStage}
              stages={stages}
              completedStages={completedStages}
            />

            {currentStage === stages.CLIENT_INFO && !isLoading && (
              <>
                <ClientInfo
                  clientName={clientname}
                  companyName={companyname}
                  email={email}
                  phoneNo={phoneNo}
                  password={password}
                  confirmPassword={setConfirmPassword}
                  actManager={actManager}
                  companySize={companySize}
                  country={country}
                  city={city}
                  setActManager={setActManager}
                  setCity={setCity}
                  setPassword={setPassword}
                  setConfirmPassword={setConfirmPassword}
                  setClientname={setClientname}
                  setEmail={setEmail}
                  setPhoneNo={setPhoneNo}
                  setCountry={setCountry}
                  setCompanySize={setCompanySize}
                  setCompanyname={setCompanyname}
                />
                <div className={styles.wrapper}>
                  <ClientSignUpOverlayBtn
                    password={password}
                    confirmPassword={confirmPassword}
                    email={email}
                    showError={showError}
                    setMessage={setMessage}
                    fillValidity={fillValidity}
                    validateEmailReceiver={validateEmailReceiver}
                    showSuccess={showSuccess}
                    handleFormSubmit={handleFormSubmit}
                    onClose={onClose}
                    setCompletedStages={setCompletedStages}
                    completedStages={completedStages}
                  />
                </div>
              </>
            )}
            {isLoading && <div className={styles.loader}></div>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientSignUpOverlay;
