import { useEffect } from 'react';
import { database } from 'firebase';
import { get, ref } from 'firebase/database';

import Loader from 'components/Loader';
import { selectMenuList } from 'pages/AdminPage/AdminPage.selectors';
import { setMenuList } from 'pages/AdminPage/AdminPage.slice';
import { useAppDispatch, useAppSelector } from 'redux/hooks';

import ListCategory from './components/ListCategory';

import styles from './MenuList.module.scss';

const MenuList = () => {
    const dispatch = useAppDispatch();
    const menuList = useAppSelector(selectMenuList);

    useEffect(() => {
        const dbMenuRef = ref(database, 'menu');

        get(dbMenuRef).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                dispatch(setMenuList(snapshot.val()));
            }
        });
    }, []);

    return (
        <div>
            {menuList ? (
                <div className={styles.listContainer}>
                    {Object.keys(menuList).map((category) => (
                        <ListCategory
                            key={category}
                            category={menuList[category]}
                            name={category}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default MenuList;
