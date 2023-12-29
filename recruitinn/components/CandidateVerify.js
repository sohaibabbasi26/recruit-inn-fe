import styles from './CandidateVerify.module.css';
import Image from 'next/image';

const CandidateVerify = () => {

    return (
        <>
            <div className={styles.coverContainer}>
                <div className={styles.banner}>
                    <div className={styles.leftContainer}>
                        <h2>Enter Verification Code</h2>
                        <p>Enter the 6-digit verification</p>
                        <p>send to <span>*******@gmail.com</span></p>

                        <div className={styles.otpContainer}>
                            <input />
                            <input />
                            <input />
                            <input />
                            <input />
                            <input />
                        </div>

                        <p id={styles.margin}>Didn't receive the code? <span> Resend code </span></p>
                    </div>

                    <div className={styles.imageDiv}>
                        <Image src='/Element.png' width={160} height={160} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default CandidateVerify;