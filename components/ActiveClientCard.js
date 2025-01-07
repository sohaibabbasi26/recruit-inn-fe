import styles from './ActiveClientCard.module.css';
import Image from 'next/image';
import { useActiveItem } from '@/contexts/ActiveItemContext';
import { useState } from 'react';

const ActiveClientCard = ({ showError, showSuccess, adminToken, setData, dataToBeSet, item, onOpen }) => {
    const { setActiveItem } = useActiveItem();

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    }

    const [error, setError] = useState(false);
    console.log("set data method:", setData);

   

    const handleFetchCompanyJobListing = async () => {
        const id = item?.company_id;
        const requestBody = { company_id: id };
    
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_REMOTE_URL}/get-all-positions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${adminToken}`,
                },
                body: JSON.stringify(requestBody),
            });
    
            const data = await response.json();
            console.log('the fetched data is:', data);
    
            if (data) {     
                setData(data); 
                handleItemClick('viewJobListing'); 
            } else {
                setData([])
                showError('There are no jobs created for the requested client!');
            }
        } catch (err) {
            console.error(err);
            setData([]);
            showError('There are no jobs created for the requested client!');
        }
    }
    


  
    const getBgColor = (status) => {
        switch (status) {
            case 'Active':
                return '#E7FFE0'
            case 'in-active':
                return '#EBEBEB';
            default:
                return null
        }
    }

    const getStatusThumb = (status) => {
        switch (status) {
            case 'Active':
                return '/activeStatus.svg'
            case 'in-active':
                return '/inActive.svg';
            default:
                return null
        }
    }

    return (
        <>
            <div
                className={styles.clientReq}
                onClick={
                    () => {
                        if (error === true) {
                            
                            // handleFetchCompanyJobListing();
                            // handleItemClick('viewJobListing');
                        } else{
                            handleFetchCompanyJobListing();
                            handleItemClick('viewJobListing');
                        }
                    }
                }>
                <div className={styles.topContainer}>
                    <div className={styles.leftDiv}>
                        <Image src='/company.svg' width={30} height={30} />
                        <div className={styles.companyName}>
                            <h2>{item?.company_name}</h2>
                            <span>{item?.account_user_name}</span>
                        </div>
                    </div>

                    <div onClick={onOpen} className={styles.btnsDiv}>
                        <span >View Job Listing</span>
                        <Image src='/rightArrow.svg' width={20} height={20} />
                    </div>
                </div>

                <div className={styles.lowerContainer}>
                    <div className={styles.left}>
                        <span>{item?.company_location}</span>
                        <span className={styles.dot}>{item?.contact_no}</span>
                        <span className={styles.dot}>{item?.email}</span>
                    </div>

                    <div className={styles.right}>
                        <span style={{ backgroundColor: getBgColor(item?.status) }}>{item.status}<Image src={getStatusThumb(item.status)} height={10} width={10} /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveClientCard;