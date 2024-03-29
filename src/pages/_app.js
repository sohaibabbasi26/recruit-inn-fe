import '@/styles/globals.css'
// import '../../components-landing/styles.css';
import { ActiveItemProvider } from '../contexts/ActiveItemContext';
import { TestProvider } from '../contexts/QuestionsContent'
import { ExpertiseItemProvider } from '@/contexts/ExpertiseContext';
import NameProvider from '@/contexts/NameProvider';
import { ActiveFlowProvider } from '@/contexts/ActiveFlowContext';

function MyApp({ Component, pageProps }) {
  return (
      <ActiveFlowProvider>
        <ActiveItemProvider>
            <Component {...pageProps} />
        </ActiveItemProvider>
      </ActiveFlowProvider>
  );
}

export default MyApp;