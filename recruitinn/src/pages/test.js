import QuestionBox from '../../components/QuestionBox';
import TestInstruction from '../../components/TestInstruction';
import styles from './test.module.css';

const test = () => {

    return(
        <>
            <TestInstruction />
            <div className={styles.superContainer}>
                <QuestionBox />
            </div>
        </>
    )
}

export default test;