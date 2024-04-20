import '@/styles/globals.css';
// import '../../components-landing/styles.css'; // Uncomment if needed
import { useEffect } from 'react';
import { ActiveItemProvider } from '@/contexts/ActiveItemContext';
import { TestProvider } from '@/contexts/QuestionsContent';
import { ExpertiseItemProvider } from '@/contexts/ExpertiseContext';
import NameProvider from '@/contexts/NameProvider';
import { ActiveFlowProvider } from '@/contexts/ActiveFlowContext';
import { TestStateProvider } from '@/contexts/TestRequirementContext';

function MyApp({ Component, pageProps }) {
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

  return (
    <TestStateProvider>
      <ActiveFlowProvider>
        <ActiveItemProvider>
          {}
          <Component {...pageProps} />
        </ActiveItemProvider>
      </ActiveFlowProvider>
    </TestStateProvider>
  );
}

export default MyApp;
