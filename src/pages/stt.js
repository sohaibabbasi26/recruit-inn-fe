// import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';

// const questionsList = [
//     "Question 1: What is your greatest strength?",
//     "Question 2: What is your greatest weakness?",
//     "Question 3: Why do you want to work here?",
//     "Question 4: Can you tell me about a challenging situation you faced at work and how you handled it?",
//     "Question 5: Where do you see yourself in five years?"
// ];

// const STT = () => {
//     const { speak, cancel } = useSpeechSynthesis();
//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);

//     const speakQuestion = (question) => {
//         cancel(); // Ensure that the previous speech is canceled
//         speak({ text: question });
//     };

//     const handleNextQuestion = () => {
//         let nextIndex = currentQuestionIndex + 1;
//         if (nextIndex < questionsList.length) {
//             setCurrentQuestionIndex(nextIndex);
//             console.log(questionsList[nextIndex]);
//             speakQuestion(questionsList[nextIndex]);
//             return;
//         }
//     };

//     return (
//         <div>
//             <h2>Interview Questions</h2>
//             <p>{questionsList[currentQuestionIndex]}</p>
//             <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questionsList.length - 1}>
//                 Next Question
//             </button>
//         </div>
//     );
// };
// export default STT;