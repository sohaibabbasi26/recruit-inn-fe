
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { useEffect, useState } from 'react';
import LoginOverlay from '../../components/LoginOverlay';

const Login = () => {

    const router = useRouter();
    
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [message , setMessage] = useState('');

    // const [showOverlay, setShowOverlay] = useState(false);

    const stages = {
        LOG_IN: 'LOG_IN',
    }

    const stageHeadings = {
        LOG_IN: 'Login',
    };
    

    const showError = (message) => {
        setMessage(message);
        setShowErrorMessage(true);
    
        setTimeout(() => {
          setShowErrorMessage(false);
        }, 3000);
      };


    const showOverlay = true;

    return (
        <>  
            <LoginOverlay  showErrorMessage={showErrorMessage} showSuccessMessage={showSuccessMessage} setMessage={setMessage} message={message}    stageHeadings={stageHeadings} stages={stages} showOverlay={showOverlay} />
        </>
    )
}
export default Login;