import { type FC } from 'react';

import { type CategoryItemsType } from 'pages/MenuPage/MenuPage.slice';
import { useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import AddNewItemButton from './components/AddNewItemButton';
import MenuItem from './components/MenuItem';

import styles from './Category.module.scss';

type CategoryPropsType = {
    category: CategoryItemsType;
    name: string;
};

const Category: FC<CategoryPropsType> = ({ category, name }) => {
    const adminData = useAppSelector(selectAdminData);

    const showAddItem =
        adminData.isAdmin &&
        (adminData.role === 'super' || adminData.role === 'admin');

    return (
        <div className={styles.categoryContainer}>
            <h1 className={styles.categoryHeader}>{name.substring(1)}</h1>
            <ul className={styles.categoriesContainer}>
                {Object.keys(category).map((menuItem) => (
                    <MenuItem
                        categoryName={name}
                        key={menuItem}
                        name={menuItem}
                        menuItem={category[menuItem]}
                    />
                ))}
                {showAddItem && <AddNewItemButton categoryName={name} />}
            </ul>
        </div>
    );
};

export default Category;
