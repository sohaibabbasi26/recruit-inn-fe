import Body from './Body';
import RightComponent from './RightComponent';
import styles from './SuperComponent.module.css';
import TopNavbar from './TopNavbar';

const SuperComponent = () => {

    return (
        <>
            <div className={styles.superContainer} >
                <TopNavbar />
                <Body />
                {/* <RightComponent /> */}
            </div>

        </>
    )
}

export default SuperComponent;