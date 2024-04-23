import styles from './ReportOverlay.module.css';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import Assessment from './Assessment';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ReportOverlay = ({ isLoading, setIsLoading, onClose, reportOverlay, selectedCandidate }) => {

    console.log('selected candidate is:', selectedCandidate)
    const [codingResult, setCodingResult] = useState();
    const [isCodingAssessment, setIsCodingAssessment] = useState(false);


    useEffect(() => {
        async function fetchCandidatesCodingResult() {
            const requestBody = {
                candidate_id: selectedCandidate?.candidate_id
            }
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-code-analysis-candidate`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        // 'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(requestBody),
                });

            const data = await response.json();
            console.log("data response:", data);
            setCodingResult(data);
            if (data && data?.data && data?.data?.result && data?.data?.result?.technicalRating) {
                setIsCodingAssessment(true);
            } else {
                setIsCodingAssessment(false);
            }
        }

        fetchCandidatesCodingResult();
    }, [selectedCandidate]);

    const calculateCumulativeMean = () => {
        let total = 0;
        let count = 0;

        if (selectedCandidate?.results?.technicalRating) {
            total += Math.ceil(selectedCandidate.results.technicalRating);
            count += 1;
        }

        if (selectedCandidate?.results?.softskillRating) {
            total += Math.ceil(selectedCandidate.results.softskillRating);
            count += 1;
        }

        if (codingResult?.data?.result?.technicalRating) {
            total += Math.ceil(parseInt(codingResult.data.result.technicalRating));
            count += 1;
        }

        if (count === 0) return 0;

        return (total / count).toFixed(2);
    }

    const overlayRef = useRef(null);
    const contentRef = useRef(null);
    const infoSymbolSize = 10;

    const headingOne = 'Technical';
    const headingTwo = 'Soft-skill';
    const headingThree = 'Coding Exercise Analysis'

    const paraOne = `Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;
    const paraTwo = `Welcome to HyperTech Solutions Unlimited, where we transcend the boundaries of reality to pioneer groundbreaking solutions in quantum software engineering. As a Quantum Code Wizard, you'll be part of a dynamic team of multidimensional thinkers who harness the power of quarks, warp drives, and a touch of magic to push the boundaries of technology.`;

    const getBackgroundColor = (score) => {
        if (score >= 7 && score <= 10) {
            return '#E7FFE0';
        } else if (score >= 5 && score <= 6) {
            return '#F0F3FF';
        } else {
            return '#FFE6E6';
        }
    }

    const getFilter = (score) => {
        if (score >= 7 && score <= 10) {
            return 'Recommended';
        } else if (score >= 5 && score <= 6) {
            return 'Qualified';
        } else {
            return 'Not Eligible';
        }
    }
    const getStatusSymbol = (score) => {
        if (score >= 7 && score <= 10) {
            return '/activeStatus.svg';
        } else if (score >= 5 && score <= 6) {
            return '/qualified.svg';
        } else {
            return '/noteligible.svg';
        }
    }

    const downloadPDF = async () => {
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current);
            const imgData = canvas.toDataURL('image/png');

            const pdf = new jsPDF({
                orientation: 'portrait',
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
        }
    };



    const handleDownloadPdf = async () => {
        const htmlContent = document.getElementById('content-to-print').innerHTML;
        if (htmlContent) {
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                body: JSON.stringify({ htmlContent }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'report.pdf');
                document.body.appendChild(link);
                link.click();
                link.parentNode.removeChild(link);
            } else {
                console.error('Failed to load PDF document.');
            }
        }
    };

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
                    <button onClick={onClose}>
                        <Image src='/shut.svg' width={15} height={15} />
                    </button>
                </div>

                <div ref={contentRef} className={`${styles.superContainer} content-to-print`}>
                    <div className={styles.coverContainer}>
                        {/*top container */}
                        <div className={styles.topContainer}>
                            <div className={styles.leftContainer}>
                                <div className={styles.imageDiv}>
                                    <Image id={styles.emoji} src='/bigEmoji.svg' width={80} height={80} />
                                </div>
                                <div className={styles.info}>
                                    <h3>{selectedCandidate?.name}</h3>
                                    <p>{selectedCandidate?.position}</p>
                                    <h4 style={{ backgroundColor: getBackgroundColor(Math.ceil(selectedCandidate?.results?.technicalRating)) }}>{getFilter(Math.ceil(selectedCandidate?.results?.technicalRating))}<Image src={getStatusSymbol(Math.ceil(selectedCandidate?.results?.technicalRating))} width={infoSymbolSize} height={infoSymbolSize} /></h4>
                                </div>
                            </div>

                            <div className={styles.rightContainer}>
                                {!isLoading && <button onClick={downloadPDF}>Download PDF</button>}
                                {isLoading && <div className={styles.loader}> </div>}
                                {/* <span>{Math.ceil(selectedCandidate?.results?.technicalRating)}/10</span> */}
                                <span>{calculateCumulativeMean()}/10</span>
                            </div>
                        </div>
                        {/* candidate test info div */}
                        <div className={styles.infoDiv}>
                            <ul>
                                <li>
                                    <span className={styles.bold}>Phone</span>
                                    <span>{(selectedCandidate?.contactNo) ? selectedCandidate?.contactNo : '03122597173'}</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Date</span>
                                    <span>{selectedCandidate?.date}</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Job Type</span>
                                    <span>{selectedCandidate?.jobType}</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Applied For</span>
                                    <span>{selectedCandidate?.company ? selectedCandidate?.company?.name : 'Self'}</span>
                                </li>
                                <li>
                                    <span className={styles.bold}>Email</span>
                                    <span>{selectedCandidate?.email}</span>
                                </li>
                            </ul>
                        </div>

                        {/*assessment components */}
                        <div className={styles.cont}>
                            <div className={styles.auto}>
                                <Assessment heading={headingOne} para={selectedCandidate?.results?.technicalAssessment} score={Math.ceil(selectedCandidate?.results?.technicalRating)} />
                                <Assessment heading={headingTwo} para={selectedCandidate?.results?.softskillAssessment} score={Math.ceil(selectedCandidate?.results?.softskillRating)} />

                                {isCodingAssessment &&
                                    (
                                        <>
                                            <Assessment heading={headingThree} para={codingResult?.data?.result?.technicalSummary} score={Math.ceil(parseInt(codingResult?.data?.result?.technicalRating))} />
                                        </>
                                    )
                                }
                                {/* {codingResult ? (
                                    
                                ) : (
                                    <>
                                    </>
                                )} */}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ReportOverlay;