import styles from "./ShareLink.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
// import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

const ShareLink = ({
  assessmentId,
  isTestRequired,
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
}) => {
  const imageSize = 80;
  const plusSize = 20;
  const iconSize = 20;
  const clipSize = 30;
  const [link, setLink] = useState();
  // const [emailReceivers, setEmailReceivers] = useState([{ email: '' }]);

  useEffect(() => {
    if (
      questionId ||
      companyId ||
      positionId ||
      assessmentId ||
      isTestRequired
    ) {
      const demolink = `https://app.recruitinn.ai/invited-candidate?position_id=${positionId}&client_id=${companyId}&q_id=${questionId}&a_id=${assessmentId}&test_req=${isTestRequired}`;
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
    setSubject(`RECRUITINN: Test link for ${position} position.`);
    setText(`Click on the following link to start a test:
        ${link}
        `);
  });

  const removeEmailReceiver = (index) => {
    setEmailReceivers((currentReceivers) =>
      currentReceivers.filter((_, i) => i !== index)
    );
  };

  return (
    <>
      <div className={styles.superContainer}>
        {/* <div className={styles.subContainer}>
                    <div className={styles.leftContainer}>
                        <Image src='/successIndicator.svg' width={imageSize} height={imageSize} />
                        <p>Your AI Assessment is ready!</p>
                    </div>

                    <div className={styles.rightContainer}>
                        <Image src='/Element.png' width={imageSize} height={imageSize} />
                    </div>
                </div> */}

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

            {/* <div className={styles.rightContainer}>
                        <Image src='/Element.png' width={imageSize} height={imageSize} />
                    </div> */}

            <div className={styles.form}>
              <div className={styles.topBar}>
                <button
                  style={{
                    color: emailReceivers.length >= 3 ? "grey" : "#6137DB",
                  }}
                  onClick={addEmailReceiver}
                  disabled={emailReceivers.length >= 3}
                >
                  Add another candidate
                </button>
                <Image src="/Plus.svg" width={plusSize} height={plusSize} />
              </div>
            </div>

            {/* <div className={styles.allFields}>
                    <div className={styles.field}>
                        <Image src='/Bag.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder="Add job title" />
                    </div>

                    <div className={styles.field}>
                        <Image src='/Bag.svg' width={iconSize} height={iconSize} />
                        <input type='text' onChange={(e) => setEmailReceiver(e.target.value)} placeholder="Enter email" />
                    </div>
                </div> */}
            <div className={styles.allFields}>
              {emailReceivers.map((receiver, index) => (
                <div className={styles.field} key={index}>
                  <div className={styles.left}>
                    <Image src="/sticker.svg" width={28} height={28} />
                    <input type="text" placeholder="Enter your name" />
                  </div>
                  <div className={styles.right}>
                    <Image src="/Bag.svg" width={iconSize} height={iconSize} />
                    <input
                      type="text"
                      value={receiver.email}
                      onChange={(e) => handleEmailChange(e, index)}
                      placeholder="Enter email"
                    />
                    {
                      // Only show the remove button if there is more than one email receiver
                      emailReceivers.length > 1 && (
                        <Image
                          onClick={() => removeEmailReceiver(index)}
                          src="/trash-bin.svg"
                          width={30}
                          height={30}
                        />
                      )
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* <button onClick={addEmailReceiver} disabled={emailReceivers.length >= 3} >Add another candidate</button> */}

            <div className={styles.linkContainer}>
              <div className={styles.wrapper}>
                <Image src="/Chain.svg" height={clipSize} width={clipSize} />
                <input value={link} readOnly />
              </div>
              <button onClick={handleCopyClick}>
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
