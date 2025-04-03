import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const ShareLinkBtns = ({showError, onContinue , onBack, receivers , onClose, setCompletedStages, completedStages, handleEmailInvite, setMessage, showSuccess, interviewCount }) => {

    const navigationIconSize = 20;

    async function handleSendInvite() {
      // Validate that all receivers have valid names and emails
      const areAllFieldsValid = receivers.every(
        (receiver) =>
          receiver.name.trim() !== "" &&
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(receiver.email.trim())
      );
    
      // If validation fails, show error message
      if (!areAllFieldsValid) {
        setMessage("Please fill in all names and valid email addresses.");
        showError();
        return;
      }
    
      // If validation passes, proceed with sending invites
      try {
        await handleEmailInvite();
        setTimeout(() => {
          window.location.reload(); // Reload the page if needed
        }, 1000);
      } catch (error) {
        console.error("Error sending invites:", error);
        setMessage("An error occurred while sending invites. Please try again.");
        showError();
      }
    }
    

    return (
      <>
        <div className={styles.btnsContainer}>
          <button id={styles.backBtn} onClick={onClose}>
            Skip Invitation
          </button>
          <button
            id={styles.forwardBtn}
            onClick={handleSendInvite}
            disabled={interviewCount === 0}
            style={{
              backgroundColor: interviewCount === 0 ? "grey" : "#6137DB",
            }}
          >
            Send Invite
            <Image
              src="/send.svg"
              width={navigationIconSize}
              height={navigationIconSize}
            />
          </button>
        </div>
      </>
    );
}
export default ShareLinkBtns;