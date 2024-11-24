import { useEffect } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { database } from 'firebase';
import { get, onValue, ref } from 'firebase/database';

import Footer from 'components/Footer';
import { useOpen } from 'hooks/useOpen';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import AddCategoryModal from './components/AddCategoryModal';
import Category from './components/Category';
import { selectMenu } from './MenuPage.selectors';
import { setMenu } from './MenuPage.slice';

import styles from './MenuPage.module.scss';

const MenuPage = () => {
    const dispatch = useAppDispatch();

    const currentMenu = useAppSelector(selectMenu);
    const adminData = useAppSelector(selectAdminData);

    const { isOpen, open, close } = useOpen();

    const showAddCategory =
        adminData.isAdmin &&
        (adminData.role === 'super' || adminData.role === 'admin');

    useEffect(() => {
        const dbMenuRef = ref(database, 'menu');

        get(dbMenuRef).then((snapshot) => {
            if (snapshot.exists()) {
                dispatch(setMenu(snapshot.val()));
            }
        });

        return onValue(dbMenuRef, (snapshot) => {
            dispatch(setMenu(snapshot.val()));
        });
    }, []);

    return (
        <>
            <Footer />
            {showAddCategory && (
                <div className={styles.addCategoryContainer}>
                    <div onClick={open} className={styles.iconContainer}>
                        <AddBoxIcon sx={{ fontSize: '5rem' }} />
                    </div>
                </div>
            )}
            <div className={styles.menuContainer}>
                {currentMenu &&
                    Object.keys(currentMenu).map((category) => (
                        <Category
                            key={category}
                            category={currentMenu[category]}
                            name={category}
                        />
                    ))}
            </div>
            {isOpen && <AddCategoryModal close={close} />}
        </>
    );
};

export default MenuPage;
