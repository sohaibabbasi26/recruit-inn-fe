import styles from './ForgotPassword.module.css';
import { useEffect } from 'react';

const ForgotPassword = ({ email, setEmail, setEmailReceiver }) => {

    useEffect(() => {
        setEmailReceiver(email); 
    }, [email, setEmailReceiver]);
    
    return (
        <div className={styles.superContainer}>
            <div className={styles.imageDiv}>
                <img src='/forgetpass.png' alt='forgot password illustration' />
            </div>
            <div className={styles.formContainer}>
                <h2>Forgot Your Password?</h2>
                <p>Enter your email address</p>
                <input 
                    type='email' 
                    placeholder='Email Address'
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />
            
            </div>
        </div>
    );
}

export default ForgotPassword;
