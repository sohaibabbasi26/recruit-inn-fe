import styles from './candidate-self.module.css';
import InvitationOverlay from '../../components/InvitationOverlay';
import SelfOverlay from '../../components/SelfOverlay';
import { useEffect } from 'react';

const CandidateSelf = () => {

    useEffect(() => {
        // Set active flow to 'candidate' in local storage
        localStorage.setItem('activeFlow', 'Candidate');
    }, []);

    const stages = {
        PERSONAL_INFO : 'PERSONAL_INFO',
        VERIFICATION : 'VERIFICATION',
        SKILLS : 'SKILLS',
        ASSESSMENT : "ASSESSMENT"
    }
    
    const stageHeadings = {
        PERSONAL_INFO : 'Hello There, Tell Us About Your Self',
        VERIFICATION : 'Please Verify Your Email',
        SKILLS : 'Tell Us About Your Skills',
        ASSESSMENT : "What Would You Like To Do?"
    };

        useEffect(() => {
        const handleKeyDown = (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
    
            const activeElement = document.activeElement;
    
           if (activeElement.tagName === 'INPUT' && activeElement.form) {
              const form = activeElement.form;
              const submitButton = form.querySelector('[type="submit"]');
              if (submitButton) {
                submitButton.click();
              }
            } else {
              const continueButton = document.getElementById('RightBottomBtns_forwardBtn__83dJ2'); 
              if (continueButton) {
                continueButton.click();
              }
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);

    const showOverlay = true;

    return (
        <>
            <SelfOverlay showOverlay={showOverlay} stages={stages} stageHeadings={stageHeadings} />
        </>
    );
}

export default CandidateSelf;