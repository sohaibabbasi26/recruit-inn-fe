import styles from './ClientInfo.module.css';
import Image from 'next/image';
import { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { isValidPhoneNumber } from 'libphonenumber-js';

const ClientInfo = ({email, phoneNo , setActManager,setCity,setClientname,setEmail,setPhoneNo,setCompanySize,setCountry,setCompanyname}) => {

    const iconSize = 25;
    const [isValid, setIsValid] = useState(true);
    const handlePhoneChange = (value, country) => {
        setPhoneNo(value);
        // Check if the phone number is valid
        setIsValid(isValidPhoneNumber(value, country));
    };
    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.inputField} >
                    <Image src='/smiley.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Client Name'  onChange={(e) => setClientname(e.target.value)} />
                </div>
                <div className={styles.inputField} >
                    <Image src='/company.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Company Name' onChange={(e) => setCompanyname(e.target.value)} />
                </div>
                <div className={styles.inputField} >
                    <Image src='/email.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Business Email' onChange={(e) => setEmail(e.target.value)} />
                </div>

                {/* <div className={styles.inputField} >
                    <Image src='/phone.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Client’s phone number' onChange={(e) => setPhoneNo(e.target.value)} />
                </div> */}
                <div className={styles.inputField}>
                    <Image src='/phone.svg' width={iconSize} height={iconSize} />
                    <PhoneInput
                        country={'us'} // Set default country (you can change it based on your requirement)
                        onChange={handlePhoneChange}
                        inputStyle={{border: 'none' }}
                        inputProps={{
                            placeholder: 'phone number',
                        }}
                    />
                </div>
                
                <div className={styles.inputField} >
                    <Image src='/Case.svg' width={iconSize} height={iconSize} />
                    <input placeholder='Account manager' onChange={(e) => setActManager(e.target.value)} />
                </div>
                
                <div className={styles.inputField} >
                    <Image src='/company.svg' width={iconSize} height={iconSize} />
                    <select onChange={(e) => setCompanySize(e.target.value)}>
                        <option>Company size</option>
                        <option>100-50</option>
                        <option>25-50</option>
                        <option>0-15</option>
                    </select>
                </div>
                <div className={styles.inputField} >
                    <Image src='/earth.svg' width={iconSize} height={iconSize} />
                    <select onChange={(e) => setCountry(e.target.value)}>
                        <option>Select country</option>
                        <option value='Pakistan'>Pakistan</option>
                        <option value='India'>India</option>
                    </select>
                </div>
                <div className={styles.inputField} >
                    <Image src='/aim.svg' width={iconSize} height={iconSize} />
                    <select onChange={(e) => setCity(e.target.value)}>
                        <option>Select city</option>
                        <option value='Karachi'>Karachi</option>
                        <option value='Lahore'>Lahore</option>
                    </select>
                </div>
            </div>
        </>
    )
}

export default ClientInfo;