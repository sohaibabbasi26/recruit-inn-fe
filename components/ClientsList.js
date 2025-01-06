import styles from './ClientList.module.css';
import Image from 'next/image';
import { useActiveItem } from "../src/contexts/ActiveItemContext";
import { useState} from "react";

const ClientList = ({ allClients , onOpen, data,showError, setData, adminToken}) => {
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
    const newArray = allClients?.slice(0, 2);
    console.log(newArray);
   

    const handleFetchCompanyJobListing = async () => {
        newArray?.map((item) => {
        const id = item?.company_id;
        const requestBody = { company_id: id };
        
       })
     
    
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

                { newArray?.map((item) => {
                    return (
                        <>
                            <div className={styles.clientReq}
                            onClick={
                           () => {
                           
                             handleFetchCompanyJobListing();
                             handleItemClick('viewJobListing');
                           
                       }
                    }>
                                <div className={styles.topContainer}>
                                    <div className={styles.leftDiv}>
                                         <Image src='/company.svg' width={30} height={30} />
                                      
                                       
                                        <div className={styles.companyName}>
                                            <h2>{item?.company_name}</h2>
                                            <span>{item?.account_user}</span>
                                        </div>
                                    </div>
                                    <div  className={styles.btnsDiv}>
                                  <span  onClick={onOpen}>View Job Listing</span>
                                 <Image src='/rightArrow.svg' width={20} height={20} />
                               </div>
                               
                                   
                                </div>
                                  
                                <div className={styles.lowerContainer}>
                                    <span>{item?.company_location}</span>
                                    <span className={styles.dot}>{item?.contact_no}</span>
                                    <span className={styles.dot}>{item?.email}</span>

                                    <div className={styles.right}>
                                  <span style={{ backgroundColor: getBgColor(item?.status) }}>{item.status}<Image src={getStatusThumb(item.status)} height={10} width={10} /></span>
                                  </div>
                                   
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