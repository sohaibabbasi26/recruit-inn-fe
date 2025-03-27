import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const AssessmentBtns = ({showSuccess, setMessage, onContinue , onBack , showBackBtn}) => {

    const navigationIconSize = 30;
    const forwardBtn = 20;

    const createAssesmentHandler = () => {
        onContinue();
        
    }

    return (
        <>
            <div className={styles.btnsContainer} >
               {showBackBtn ?  <button id={styles.backBtn} onClick={onBack} ><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>: null}
                <button id={styles.forwardBtn} onClick={createAssesmentHandler} >Generate Test<Image src='/generateTxt.svg' width={forwardBtn} height={forwardBtn}  /></button>
            </div>
        </> 
    )
}

export default AssessmentBtns;