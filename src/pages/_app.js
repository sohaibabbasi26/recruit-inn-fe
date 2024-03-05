import '@/styles/globals.css'
// import '../../components-landing/styles.css';
import { ActiveItemProvider } from '../contexts/ActiveItemContext';
import { TestProvider } from '../contexts/QuestionsContent'
import { ExpertiseItemProvider } from '@/contexts/ExpertiseContext';
import NameProvider from '@/contexts/NameProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ExpertiseItemProvider>
      <TestProvider>
        <ActiveItemProvider>
          <NameProvider>
            <Component {...pageProps} />
          </NameProvider>
        </ActiveItemProvider>
      </TestProvider>
    </ExpertiseItemProvider>
  );
}

export default MyApp;