import { useEffect, useState } from 'react';
import SetPasswordOverlay from '../../../components/SetPasswordOverlay';
// import styles from './set-password.module.css';
import { useRouter } from 'next/router';

const SetPassword = () => {

    const router = useRouter();
    const {id} = router?.query;
    //("router id:", id);
    const [email,setEmail] = useState('');

    const stages = {
        SET_PASSWORD: 'SET_PASSWORD',   
    }

    const stageHeadings = {
        SET_PASSWORD: 'Set your password up and be ready to login!',
    };

    
    const showOverlay = true;

    return(
        <>
            <SetPasswordOverlay setEmail={setEmail} email={email} showOverlay={showOverlay} stages={stages} stageHeadings={stageHeadings} />
        </>
    )
}

export default SetPassword;