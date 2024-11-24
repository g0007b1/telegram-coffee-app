import { type FC } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import DeleteIcon from '@mui/icons-material/Delete';
import { database } from 'firebase';
import { ref, remove } from 'firebase/database';

import placeholder from 'assets/square-placeholder.jpg';
import ConfirmAlert from 'components/ConfirmAlert';
import { useOpen } from 'hooks/useOpen';
import { type MenuItemType } from 'pages/MenuPage/MenuPage.slice';
import { useAppSelector } from 'redux/hooks';
import { selectAdminData } from 'redux/slices/admin.selectors';

import styles from './MenuItem.module.scss';

type MenuItemPropsType = {
    menuItem: MenuItemType;
    name: string;
    categoryName: string;
};

const MenuItem: FC<MenuItemPropsType> = ({ menuItem, name, categoryName }) => {
    const adminData = useAppSelector(selectAdminData);

    const { isOpen, open, close } = useOpen();

    const showDeleteItem =
        adminData.isAdmin &&
        (adminData.role === 'super' || adminData.role === 'admin');

    const onAcceptDelete = () => {
        const itemRef = ref(database, `menu/${categoryName}/${name}`);
        remove(itemRef);
    };

    return (
        <li className={styles.menuItemContainer}>
            <div className={styles.itemContainer}>
                <div>
                    <LazyLoadImage
                        effect="blur"
                        className={styles.image}
                        src={menuItem.image}
                        placeholderSrc={placeholder}
                    />
                    <p className={styles.coffeeName}>{name}</p>
                </div>
                <div onClick={open} className={styles.deleteIcon}>
                    {showDeleteItem && <DeleteIcon sx={{ color: '#f44336' }} />}
                </div>
            </div>
            {isOpen && (
                <ConfirmAlert
                    onAccept={onAcceptDelete}
                    onDeny={close}
                    middleText={`Удалить ${name}?`}
                />
            )}
        </li>
    );
};

export default MenuItem;
