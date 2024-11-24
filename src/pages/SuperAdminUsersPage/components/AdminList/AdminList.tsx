import { selectSuperAdminUsersPageUsers } from 'pages/SuperAdminUsersPage/SuperAdminUsersPage.selectors';
import { useAppSelector } from 'redux/hooks';

import SingleAdmin from './components/SingleAdmin';

import styles from './AdminList.module.scss';

const AdminList = () => {
    const adminUsers = useAppSelector(selectSuperAdminUsersPageUsers);

    return (
        <div className={styles.adminListContainer}>
            {adminUsers &&
                Object.keys(adminUsers).map((userId) => (
                    <SingleAdmin
                        id={userId}
                        user={adminUsers[userId]}
                        key={userId}
                    />
                ))}
        </div>
    );
};

export default AdminList;
