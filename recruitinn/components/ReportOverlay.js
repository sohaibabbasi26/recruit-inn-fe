import styles from './ReportOverlay.module.css';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Assessment from './Assessment';


const ReportOverlay = ({ onClose, reportOverlay , selectedCandidate }) => {

    const overlayRef = useRef(null);
    const infoSymbolSize = 10;

    const headingOne ='Technical';
    const headingTwo ='Soft-skill';

    const paraOne =`Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;
    const paraTwo =`Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;
    
    const getBackgroundColor = (score) => {
        if(score >= 7 && score <= 10){
            return '#E7FFE0';
        } else if (score >= 5 && score <= 6){
            return '#F0F3FF';
        } else {
            return '#FFE6E6';
        }
    }

    const getFilter = (score) => {
        if(score >= 7 && score <= 10){
            return 'Recommended';
        } else if (score >= 5 && score <= 6){
            return 'Qualified';
        } else {
            return 'Not Eligible';
        }
    }
    const getStatusSymbol = (score) => {
        if(score >= 7 && score <= 10){
            return '/activeStatus.svg';
        } else if (score >= 5 && score <= 6){
            return '/qualified.svg';
        } else {
            return '/noteligible.svg';
        }
    }

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (reportOverlay) {
            gsap.to(overlayRef.current, {
                y: '0%',
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
        else {
            gsap.to(overlayRef.current, {
                y: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: onClose
            });
        }

        return (() => {
            gsap.to(overlayRef.current,
                { y: '100%', opacity: 0, duration: 0.1, ease: 'power1' }
            );
        });
    }, [reportOverlay, onClose])

    return (
        <>

            <div ref={overlayRef} className={styles.parent}>

                <div className={styles.btn}>
                    <button onClick={onClose}></button>
                </div>


                <div className={styles.superContainer}>
                    <div className={styles.coverContainer}>

                        {/*top container */}
                        <div className={styles.topContainer}>
                            <div className={styles.leftContainer}>
                                <div className={styles.imageDiv}>
                                    <Image id={styles.emoji} src='/bigEmoji.svg' width={70} height={70} />
                                </div>
                                <div className={styles.info}>
                                    <h3>{selectedCandidate?.name}</h3>
                                    <p>{selectedCandidate?.position}</p>
                                    <h4 style={{backgroundColor: getBackgroundColor(selectedCandidate?.score)}}>{getFilter(selectedCandidate?.score)}<Image src={getStatusSymbol(selectedCandidate?.score)} width={infoSymbolSize} height={infoSymbolSize} /></h4>
                                </div>
                            </div>

                            <div className={styles.rightContainer}>
                                <span>{selectedCandidate?.score}/10</span>
                            </div>
                        </div>

                        {/* candidate test info div */}

                        <div className={styles.infoDiv}>
                            <ul>
                                <li>
                                    <span className={styles.bold}>Phone</span>
                                    <span>+92 3042324115</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Date</span>
                                    <span>15 Dec 2023</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Job Type</span>
                                    <span>{selectedCandidate?.jobType}</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Applied For</span>
                                    <span>Self</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Email</span>
                                    <span>bruce.wayne@gmail.com</span>
                                </li>
                            </ul>
                        </div>

                        {/*assessment components */}

                         <Assessment heading={headingOne} para={paraOne} />   
                         <Assessment heading={headingTwo} para={paraTwo} />   
                        
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReportOverlay;