import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const AdminOverlayBtns = ({ onContinue , onBack , setCompletedStages, completedStages, onClose }) => {

    const navigationIconSize = 30;
    const iconSize = 20;
    return (
        <>
            <div className={styles.btnsContainer} >
                <button id={styles.backBtn} onClick={onClose}><Image src='/backward.svg' width={navigationIconSize} height={navigationIconSize} />Back</button>
                <button id={styles.forwardBtn} onClick={onClose} >Add Client <Image src='/addsign.svg' width={iconSize} height={iconSize}  /></button>
            </div>
        </> 
    )
}

export default AdminOverlayBtns;