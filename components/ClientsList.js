import styles from './ClientList.module.css';
import Image from 'next/image';
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { useState} from "react";
const ClientList = ({ allClients }) => {
//ans
const { activeItem, setActiveItem } = useActiveItem();
  const [clickedItem, setClickedItem] = useState("");
  
  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
    setClickedItem(itemName);
    localStorage.setItem("activeItem", itemName);
    setTimeout(() => setClickedItem(""), 200);
  };
    const goToAllIconSize = 15;
    const data = allClients?.slice(0, 2);
    console.log(data)

    return (
        <>
            <div className={styles.superContainer}>

                <div className={styles.headingContainer}>
                    <div className={styles.heading} >
                        <h3>Client Requests</h3>
                        <span>{allClients?.length}</span>
                    </div>
                    <div className={`${styles.dropdownList} ${
                    activeItem === "AllClients" ? styles.active : ""
                  }`}
                  onClick={() => handleItemClick("AllClients")}>
                   <Image src="/goAll.svg" width={goToAllIconSize} height={goToAllIconSize} />
                  </div>
                   
                </div>

                {data?.map((item) => {
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

                                    {/* <div className={styles.btnsDiv}>
                                        <button id={styles.reject} >Reject</button>
                                        <button id={styles.accept}>Accept</button>
                                    </div> */}
                                </div>

                                <div className={styles.lowerContainer}>
                                    <span>{item?.company_location}</span>
                                    <span className={styles.dot}>{item?.contact_no}</span>
                                    <span className={styles.dot}>{item?.email}</span>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default ClientList;