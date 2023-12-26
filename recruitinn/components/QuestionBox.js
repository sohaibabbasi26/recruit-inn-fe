import styles from './QuestionBox.module.css';
import Image from 'next/image';
import { useState } from 'react';
import { dummyQuestions } from '@/data/dummyQuestions';

const QuestionBox = () => {

    const questions = ['1', '2', '3', '4', '5'];
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
    const [completedQuestions, setCompletedQuestions] = useState([]);


    // 

    const toggleComponent = () => {
        setCompletedQuestions(oldArray => [...oldArray, currentQuestion]);

        const currentIndex = questions.indexOf(currentQuestion);
        const nextIndex = currentIndex + 1 < questions.length ? currentIndex + 1 : 0;
        setCurrentQuestion(questions[nextIndex]);
    }


    return (
        <>
            <div className={styles.container}>

                {/*top container*/}
                <div className={styles.topContainer}>
                    <div className={styles.questionNoList}>
                        <ul>
                            {questions.map((question, index) => {
                                return (
                                    <>
                                        <li
                                            key={question}
                                            style={completedQuestions.includes(question) ?
                                                { backgroundColor: '#F0EDFC', color: '#6137DB' } :
                                                currentQuestion === question ?
                                                    { backgroundColor: '#6137DB', color: '#fff' } :
                                                    { backgroundColor: '#F5F5F5', color: '#4A525D' }}>{question}
                                        </li>
                                    </>
                                )
                            })}
                        </ul>
                    </div>

                    <span> <Image src='/timer.svg' width={20} height={20} /> 0:59</span>
                </div>

                {/* question container */}

                <div className={styles.questionContainer}>
                    {currentQuestion === questions[0] ? (
                        <span>
                            {dummyQuestions[0].question}
                        </span>
                    ) : currentQuestion === questions[1] ? (
                        <span>
                            {dummyQuestions[1].question}
                        </span>
                    ) : currentQuestion === questions[2] ? (
                        <span>
                            {dummyQuestions[2].question}
                        </span>
                    ) : currentQuestion === questions[3] ? (
                        <span>
                            {dummyQuestions[3].question}
                        </span>
                    ) : currentQuestion === questions[4] ? (
                        <span>
                            {dummyQuestions[4].question}
                        </span>
                    ) : ''
                    }
                </div>

                {/*Record button */}

                <button className={styles.recordBtn}><Image src='/mic.svg' width={30} height={30} />Click To Record Answer</button>


                {/*lower container */}
                <div className={styles.lowerContainer}>
                    <button onClick={toggleComponent}>
                        Next Question
                        <Image src='/forward.svg' width={20} height={20} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default QuestionBox;