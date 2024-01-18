import styles from './TopNavbar.module.css';
import Image from 'next/image';

const TopNavbar = () => {

    const searchLogoSize = 20;
    const iconSize = 15;
    

    return (
        <>
            <div className={styles.masterContainer}>
                <div className={styles.searchBar}>
                    <div className={styles.container}>
                        <div className={styles.searchInput}>
                            <Image src='/Search.svg' height={searchLogoSize} width={searchLogoSize} />
                            <input type='text' value="Search..." />
                        </div>

                        <div className={styles.selectCategory}>
                            <select>
                                <option>Candidates</option>
                                <option>Jobs</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopNavbar;