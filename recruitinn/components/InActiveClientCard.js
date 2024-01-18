import styles from './ActiveClientCard.module.css';
import Image from 'next/image';
import { useActiveItem } from '@/contexts/ActiveItemContext';

const InActiveClientCard = ({ item, setData }) => {

    const { setActiveItem } = useActiveItem();

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    }

    const getBgColor = (status) => {
        switch (status) {
            case 'active':
                return '#E7FFE0'
            case 'in-active':
                return '#EBEBEB';
            default:
                return null
        }
    }

    const getStatusThumb = (status) => {
        switch (status) {
            case 'active':
                return '/activeStatus.svg'
            case 'in-active':
                return '/inActive.svg';
            default:
                return null
        }
    }

    const handleFetchCompanyJobListing = async () => {

        const id = item?.company_id
        const requestBody = {
            company_id: id
        }
        const response = await fetch('http://127.0.0.1:3002/v1/get-all-positions',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjM4Yzk2MmRiLTMzM2QtNDY0My1iMWY2LTFjZTgzYzhjOGI3YiIsImVtYWlsIjoic29iaWFiYmFzaTIyQGdtYWlsLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwNTA0NTAwNiwiZXhwIjoxNzA1NjQ5ODA2fQ.RXK4x6YEGygJ1KpsuwfwiibZv6Q4-Od-W88h5S1n6uU`
                },
                body: JSON.stringify(requestBody),
            });

        const data = await response.json();
        console.log('the fetched data is:', data);
        setData(data);
    }

    return (
        <>
            <div
                className={styles.clientReq}
                onClick={
                    async () => {
                        await handleFetchCompanyJobListing();
                        handleItemClick('viewJobListing')
                    }
                }
            >
                <div className={styles.topContainer}>
                    <div className={styles.leftDiv}>
                        <Image src='/company.svg' width={30} height={30} />
                        <div className={styles.companyName}>
                            <h2>{item?.company_name}</h2>
                            <span>{item?.account_user}</span>
                        </div>
                    </div>

                    <div className={styles.btnsDiv}>
                        <span onClick={
                            async () => {
                                await handleFetchCompanyJobListing();
                                handleItemClick('viewJobListing')
                            }
                        } >View Job Listing</span>
                        <Image src='/rightArrow.svg' width={20} height={20} />
                    </div>
                </div>

                <div className={styles.lowerContainer}>
                    <div className={styles.left}>
                        <span>{item?.location}</span>
                        <span className={styles.dot}>{item?.phone_no}</span>
                        <span className={styles.dot}>{item?.email}</span>
                    </div>

                    <div className={styles.right}>
                        <span style={{ backgroundColor: getBgColor(item?.status) }} >{item.status}<Image src={getStatusThumb(item?.status)} height={10} width={10} /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InActiveClientCard;