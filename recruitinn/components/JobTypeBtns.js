import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const JobTypeBtns = ({ onContinue, onBack }) => {
    const navigationIconSize = 30;

    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onBack} ><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={onContinue} >Create Job<Image src='/Case.svg' width={navigationIconSize} height={navigationIconSize} /></button>
            </div>
        </>
    );
}

export default JobTypeBtns