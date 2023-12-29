import styles from './ActiveClientCard.module.css';
import Image from 'next/image';
import { useActiveItem } from '@/contexts/ActiveItemContext';

const InActiveClientCard = ({item}) => {

    const {setActiveItem} = useActiveItem();

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    }

    const getBgColor = (status) => {
        switch(status){
            case 'active':
                return '#E7FFE0'
            case 'in-active':
                return '#EBEBEB';
            default:
                return null
        }
    }

    const getStatusThumb = (status) => {
        switch(status){
            case 'active':
                return '/activeStatus.svg'
            case 'in-active':
                return '/inActive.svg';
            default:
                return null
        }
    }

    return (
        <>
        <div className={styles.clientReq}>
            <div className={styles.topContainer}>
                <div className={styles.leftDiv}>
                    <Image src='/company.svg' width={30} height={30} />
                    <div className={styles.companyName}>
                        <h2>{item?.company_name}</h2>
                        <span>{item?.account_user}</span>
                    </div>
                </div>

                <div className={styles.btnsDiv}>
                    <span onClick={() => handleItemClick('viewJobListing')} >View Job Listing</span>
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
                        <span style={{backgroundColor: getBgColor(item?.status)}} >{item.status}<Image src={getStatusThumb(item?.status)} height={10} width={10} /></span>
                    </div>
                </div>
        </div>
    </>
    )
}

export default InActiveClientCard;