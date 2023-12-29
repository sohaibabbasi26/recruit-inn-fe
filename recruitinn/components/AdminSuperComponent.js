import AdminBody from './AdminBody';
import Body from './Body';
import RightComponent from './RightComponent';
import styles from './SuperComponent.module.css';
import TopNavbar from './TopNavbar';

const AdminSuperComponent = () => {

    return (
        <>
            <div className={styles.superContainer} >
                <TopNavbar />
                <AdminBody />
            </div>

        </>
    )
}

export default AdminSuperComponent;