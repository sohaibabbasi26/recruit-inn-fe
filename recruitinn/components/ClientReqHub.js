import styles from './ClientReqHub.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ActiveClientCard from './ActiveClientCard';
import InActiveClientCard from './InActiveClientCard';
import RequestedClientCard from './RequestedClientCard';

const ClientReqHub = ({data , onOpen, dataToBeSet, setData, heading}) => {

    console.log('data: ',data)
    
    // console.log("set data method:",setData)

    const [isRequest,setIsRequest] = useState(false);
    const [isActive,setIsActive] = useState(true);  

    return (
        <>
            <div className={styles.parentContainer}>
                <div className={styles.superContainer}>
                    <div className={styles.headingContainer}>
                        <div className={styles.heading}>
                            <h3>{heading}</h3>
                            <span>{data?.length}</span>
                        </div>

                    </div>

                    <div className={styles.subContainer}>
                        {data?.map((item,index) => {
                                switch(item.status){
                                    case 'Active':  
                                        return <ActiveClientCard setData={setData} dataToBeSet={dataToBeSet} key={index} item={item} onOpen={onOpen} />
                                    case 'in-active':
                                        return <InActiveClientCard setData={setData} dataToBeSet={dataToBeSet} key={index} item={item} />
                                    case 'request':
                                        return <RequestedClientCard setData={setData} dataToBeSet={dataToBeSet} key={index} item={item} />
                                    default:
                                        return null;
                                }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClientReqHub;