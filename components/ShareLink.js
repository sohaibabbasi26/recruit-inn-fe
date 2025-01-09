import styles from "./ShareLink.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

const ShareLink = ({
  removeReceiver,
  receivers,
  setReceivers,
  handleReceiverChange,
  handleNameChange,
  removeEmailReceiver,
  setNameReceivers,
  name,
  setName,
  assessmentId,
  isTestRequired,
  language,
  emailReceivers,
  setEmailReceivers,
  handleEmailChange,
  addEmailReceiver,
  questionId,
  companyId,
  emailReceiver,
  setEmailReceiver,
  subject,
  setSubject,
  text,
  setText,
  position,
  showSuccess,
  setMessage,
  positionId,
  positionName,
  interviewCount,
}) => {
  const imageSize = 60;
  const plusSize = 20;
  const iconSize = 20;
  const clipSize = 30;
  const [link, setLink] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState("");

  // const [emailReceivers, setEmailReceivers] = useState([{ email: '' }]);

  useEffect(() => {
    if (
      questionId ||
      companyId ||
      positionId ||
      assessmentId ||
      isTestRequired
    ) {
      const demolink = `https://app.recruitinn.ai/invited-candidate?position_id=${positionId}&client_id=${companyId}&q_id=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}&language=${language}`;
      setLink(demolink);
    }
  }, [questionId, isTestRequired, assessmentId]);

  const [copySuccess, setCopySuccess] = useState("");
  function copyToClipboard(text) {
    if ("clipboard" in navigator) {
      return navigator.clipboard.writeText(text);
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const result = document.execCommand("copy");
      document.body.removeChild(textarea);
      return result;
    }
  }

  const handleCopyClick = () => {
    copyToClipboard(link)
      .then(() => setCopySuccess("Copied!"))
      .catch((err) => console.error("Could not copy text: ", err));
    setMessage("Your link has been copied");
    showSuccess();
  };

  useEffect(() => {
    setSubject(`RecruitInn AI Assessment Link for ${positionName} position.`);
    setText(`Dear Candidate,
To complete your next step in the hiring process! Please find your test link below, powered by RecruitInn.ai. This test will help us evaluate your skills and qualifications for the ${positionName} position.
Your test link: ${link}`);
  });

  return (
    <>
      <div className={styles.superContainer}>
        <div className={styles.parent}>
          <div className={styles.subParent}>
            <div className={styles.subContainer}>
              <div className={styles.leftContainer}>
                <Image
                  src="/successIndicator.svg"
                  width={imageSize}
                  height={imageSize}
                />
                <p>Your AI Assessment is ready!</p>
              </div>

              <div className={styles.rightContainer}>
                <Image
                  src="/Element.png"
                  width={imageSize}
                  height={imageSize}
                />
              </div>
            </div>

            <div>
              <div className={styles.form}>
                <div className={styles.topBar}>
                  <button
                    style={{
                      color: receivers.length >= 3 ? "grey" : "#6137DB",
                    }}
                    onClick={() => {
                      if (receivers.length >= 3) {
                        setShowSuccessMessage(
                          "You can copy the link assessment and share with other candidates"
                        );
                      } else {
                        addEmailReceiver();
                        setShowSuccessMessage("");
                      }
                    }}
                  >
                    Add another candidate
                  </button>
                  <Image src="/Plus.svg" width={plusSize} height={plusSize} />
                </div>
              </div>

              <div className={styles.allFields}>
                {receivers.map((receiver, index) => (
                  <div className={styles.field} key={index}>
                    <div className={styles.left}>
                      <Image src="/sticker.svg" width={28} height={28} />
                      <input
                        type="text"
                        value={receiver.name}
                        onChange={(e) =>
                          handleReceiverChange(index, "name", e.target.value)
                        }
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className={styles.right}>
                      <Image
                        src="/Bag.svg"
                        width={iconSize}
                        height={iconSize}
                      />
                      <input
                        type="text"
                        value={receiver.email}
                        onChange={(e) =>
                          handleReceiverChange(index, "email", e.target.value)
                        }
                        placeholder="Enter email"
                      />
                      {receivers.length > 1 && (
                        <Image
                          onClick={() => {
                            removeReceiver(index);
                            setShowSuccessMessage("");
                          }}
                          src="/trash-bin.svg"
                          width={30}
                          height={30}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <p className={styles.message}>{showSuccessMessage}</p>
            <div className={styles.linkContainer}>
              <div className={styles.wrapper}>
                <Image src="/Chain.svg" height={clipSize} width={clipSize} />
                <input value={link} readOnly />
              </div>
              <button
                onClick={handleCopyClick}
                disabled={interviewCount === 0}
                style={{
                  backgroundColor: interviewCount === 0 ? "grey" : "#6137DB",
                }}
              >
                Copy Assessment Link
                <Image src="/Copy.svg" width={iconSize} height={iconSize} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareLink;
