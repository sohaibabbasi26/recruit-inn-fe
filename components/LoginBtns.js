import styles from './RightBottomBtns.module.css';
import Image from 'next/image';

const LoginBtns = ({ loginApiCall, email , setEmail , showError, setShowErrorMessage , password ,setPassword ,  onContinue , onBack , setCompletedStages, completedStages, onClose }) => {
    // const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');

    const validateForm = () => {
        let isValid = true;
        // Validate email
        if (!email?.trim()) {
            console.log("email checking   ...");
            showError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            showError('Invalid email format');
            isValid = false;
        }

        // Validate password
        if (!password?.trim()) {
            showError('Password is required');
            isValid = false;
        }

        return isValid;
    };

    const navigationIconSize = 30;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            // Proceed with form submission
            loginApiCall();
            // You can send your request to the server here
        };
    };

    return (
        <>
            <div className={styles.btnsContainer}>
                <button id={styles.forwardBtn} onClick={handleSubmit} >Continue <Image src='/Forward.svg' width={navigationIconSize} height={navigationIconSize}  /></button>
            </div>
        </> 
    )
}

export default LoginBtns;