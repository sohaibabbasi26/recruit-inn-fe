import styles from './ShareLink.module.css';
import Image from 'next/image';

const ShareLink = () => {

    const imageSize = 80;
    const plusSize = 20;
    const iconSize = 20;
    const clipSize = 30;

    const demolink = 'https://unsplash.com/photos/9JsQx2coxvI9JsQx2yokvII9JsQxoxvI9';

    return (
        <>
            <div className={styles.superContainer}>
                <div className={styles.subContainer}>
                    <div className={styles.leftContainer}>
                        <Image src='/successIndicator.svg' width={imageSize} height={imageSize} />
                        <p>Your AI Assessment is ready!</p>
                    </div>

                    <div className={styles.rightContainer}>
                        <Image src='/Element.png' width={imageSize} height={imageSize} />
                    </div>
                </div>

                <div className={styles.form}>
                    <div className={styles.topBar}>
                        <button>Add another candidate </button>
                        <Image src='/Plus.svg' width={plusSize} height={plusSize} />
                    </div>
                </div>

                <div className={styles.allFields}>
                    <div className={styles.field}>
                        <Image src='/Bag.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder="Add job title" />
                    </div>

                    <div className={styles.field}>
                        <Image src='/Bag.svg' width={iconSize} height={iconSize} />
                        <input type='text' placeholder="Enter location" />
                    </div>
                </div>
            
                <div className={styles.linkContainer}>
                    <div className={styles.wrapper}>
                        <Image src='/Chain.svg' height={clipSize} width={clipSize} />
                        <p>{demolink}</p>
                    </div>
                    <button>Copy Assessment Link  <Image src='/Copy.svg' width={iconSize} height={iconSize} /></button>
                </div>
            </div>
        </>
    );
}

export default ShareLink;