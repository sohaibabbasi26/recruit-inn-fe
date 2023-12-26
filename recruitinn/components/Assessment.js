import styles from './Assessment.module.css';

const Assessment = ({heading,para}) => {

    return (
        <>
            <div className={styles.assessmentContainer}>
                <div className={styles.header}>
                    <h2>{heading} Assessment</h2>
                    <span>9/10</span>
                </div>

                <div className={styles.summary}>
                    <h4>{heading} Summary</h4>
                    <p>
                        {para}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Assessment;