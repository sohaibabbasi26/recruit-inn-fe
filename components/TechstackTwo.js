import styles from './TechstackTwo.module.css'; 
import Image from 'next/image';

const TechstackTwo = () => {
    return (
        <div className={`container h-[50%] w-[100%] bg-primary rounded-lg mb-[0.5rem] flex justify-center`}>
            <div className={`${styles.logos} h-[16rem] w-80p flex justify-center`}>
                <div className={`${styles["logos-slide"]} h-[100%]`}>
                    <Image src='/cplusplus.png' alt="client" width={1240} height={1240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/cplusplus.png' alt="client" width={240} height={240} className={styles.img} />
                    <Image src='/python.png' alt="client" width={240} height={240} className={styles.img} />
                </div>
            </div>
        </div>
    );
};
export default TechstackTwo;