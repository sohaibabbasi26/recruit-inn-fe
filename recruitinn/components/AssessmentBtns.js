import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const AssessmentBtns = ({ onContinue , onBack }) => {

    const navigationIconSize = 30;
    const forwardBtn = 20;

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onBack} ><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={onContinue} >Generate Test<Image src='/generateTxt.svg' width={forwardBtn} height={forwardBtn}  /></button>
            </div>
        </> 
    )
}

export default AssessmentBtns;