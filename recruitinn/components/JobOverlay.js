import styles from './JobOverlay.module.css';
import Image from 'next/image';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const JobOverlay = ({ onClose, jobOverlay, selectedJob }) => {

    const overlayRef = useRef(null);
    const iconSize = 20;
    const infoSymbolSize = 10;

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        if (jobOverlay) {
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
    }, [jobOverlay, onClose])
    
    const getBackgroundColor = (status) => {
        if(status === 'Active'){
            return '#E7FFE0';
        } else {
            return '#FFE6E6';
        }
    }

    const getStatusSymbol = (status) => {
        if(status === 'Active'){
            return '/activeStatus.svg';
        } else {
            return '/noteligible.svg';
        }
    }


    return (
        <>
            <div ref={overlayRef} className={styles.parent}>

                <div className={styles.btn}>
                    <button onClick={onClose}></button>
                </div>


                <div className={styles.superContainer}>

                    <Image id={styles.topImage} src='/flower1.png' width={800} height={500} />
                    <div className={styles.coverContainer}>

                        {/*top conatiner */}
                        <div className={styles.topContainer}>
                            <div className={styles.content}>
                                <h1>{selectedJob?.designation}</h1>
                                <div className={styles.subInfo}>
                                    <p><Image src='/JOB_TYPE-active.svg' width={iconSize} height={iconSize} />Remote</p>
                                    <span style={{backgroundColor: getBackgroundColor(selectedJob?.status)}}>{selectedJob?.status}<Image src={getStatusSymbol(selectedJob?.status)} width={infoSymbolSize} height={infoSymbolSize} /></span>
                                </div>
                            </div>
                        </div>

                        {/* body */}

                        <div className={styles.description}>
                            <h4>About Us:</h4>
                            <span>
                                Write about your company...
                            </span>

                            <h4>Description:</h4>
                            <span>
                                Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.
                            </span>
                        </div>

                        {/* skils section */}



                        <div className={styles.techContainer}>
                            <h2>Skills</h2>
                            <div className={styles.TechStack}>
                                <ul>
                                    {selectedJob?.techStack.map((item)=>{
                                        return(
                                            <li><Image id={styles.unique} src={item?.img} width={iconSize} height={iconSize} />{item?.skill}</li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <Image id={styles.lowerImage} src='/flower2.png' width={700} height={300} />
            </div>
        </>
    )
}

export default JobOverlay;