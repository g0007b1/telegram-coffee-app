import { useEffect } from 'react';
import { database } from 'firebase';
import { get, onValue, ref } from 'firebase/database';

import SuperAdminError from 'components/AdminError';
import Footer from 'components/Footer';
import Loader from 'components/Loader';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import AddUser from './components/AddUser';
import AdminList from './components/AdminList';
import { selectSuperAdminUsersPageUsers } from './SuperAdminUsersPage.selectors';
import { setAdminUsers } from './SuperAdminUsersPage.slice';

import styles from './SuperAdminUsersPage.module.scss';

const SuperAdminUsersPage = () => {
    const { isAdmin } = useAppSelector(selectAdminData);
    if (!isAdmin) {
        return <SuperAdminError />;
    }

    const dispatch = useAppDispatch();

    const adminUsers = useAppSelector(selectSuperAdminUsersPageUsers);

    console.log(adminUsers);

    useEffect(() => {
        if (isAdmin) {
            const adminRef = ref(database, 'admin');

            get(adminRef).then((snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setAdminUsers(snapshot.val()));
                }
            });

            return onValue(adminRef, (snapshot) => {
                if (snapshot.exists()) {
                    dispatch(setAdminUsers(snapshot.val()));
                }
            });
        }
    }, []);

    return (
        <>
            <Footer />
            {adminUsers ? (
                <>
                    <AdminList />
                    <AddUser />
                </>
            ) : (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            )}
        </>
    );
};

export default SuperAdminUsersPage;
