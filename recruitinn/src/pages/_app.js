import '@/styles/globals.css'
import { ActiveItemProvider } from '../contexts/ActiveItemContext';

function MyApp({ Component, pageProps }) {
  return (
    <ActiveItemProvider>
      <Component {...pageProps} />
    </ActiveItemProvider>
  );
}

export default MyApp;