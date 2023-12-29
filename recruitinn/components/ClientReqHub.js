import styles from './ClientReqHub.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ActiveClientCard from './ActiveClientCard';
import InActiveClientCard from './InActiveClientCard';
import RequestedClientCard from './RequestedClientCard';

const ClientReqHub = ({ data , onOpen }) => {

    const [isRequest,setIsRequest] = useState(false);
    const [isActive,setIsActive] = useState(true);

    return (
        <>
            <div className={styles.parentContainer}>
                <div className={styles.superContainer}>
                    <div className={styles.headingContainer}>
                        <div className={styles.heading}>
                            <h3>All Client Requests</h3>
                            <span>1000</span>
                        </div>

                        <select>
                            <option value='hybrid'>Hybrid</option>
                            <option value='onsite'>On-site</option>
                            <option value='remote'>Remote</option>
                        </select>
                    </div>

                    <div className={styles.subContainer}>
                        {data.map((item,index) => {
                                switch(item.status){
                                    case 'active':
                                        return <ActiveClientCard key={index} item={item} onOpen={onOpen} />
                                    case 'in-active':
                                        return <InActiveClientCard key={index} item={item} />
                                    case 'request':
                                        return <RequestedClientCard key={index} item={item} />
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