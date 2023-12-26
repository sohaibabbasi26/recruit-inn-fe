import styles from './TestInstruction.module.css';

const TestInstruction = () => {

    return (
        <>
            <div className={styles.backDropContainer}>
                <div className={styles.instructionsBox}>
                    <div className={styles.container}>
                        <h3>Assesment Instructions</h3>

                        {/* instruction lists */}
                        <div className={styles.instructionsContainer}>

                            <ul className={styles['custom-bullets']}>
                                <li>
                                    Make sure your connection is stable.
                                </li>
                                <li>
                                    Make sure your connection is stable.
                                </li>
                                <li>
                                    Make sure your connection is stable.
                                </li>
                                <li>
                                    Make sure your connection is stable.
                                </li>
                            </ul>
                        </div>

                    <div className={styles.lowerContainer}>
                         <button>Let's Start</button>
                    </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default TestInstruction;

