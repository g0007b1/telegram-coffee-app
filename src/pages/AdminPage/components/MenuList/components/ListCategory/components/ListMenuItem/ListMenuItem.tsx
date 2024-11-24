import { type FC } from 'react';

import { type MenuItemType } from 'pages/MenuPage/MenuPage.slice';

import SelectVolumeButton from './components/SelectVolumeButton';

import styles from './ListMenuItem.module.scss';

type ListMenuItemPropsType = {
    menuItem: MenuItemType;
    name: string;
    category: string;
};

const ListMenuItem: FC<ListMenuItemPropsType> = ({
    menuItem,
    name,
    category,
}) => {
    return (
        <div className={styles.listMenuItemContainer}>
            <div className={styles.name}>{name}</div>
            <div className={styles.buttonsContainer}>
                {menuItem.volumes &&
                    Object.keys(menuItem.volumes).map((volume) => (
                        <SelectVolumeButton
                            category={category}
                            price={menuItem.volumes[volume]}
                            name={name}
                            stamp={menuItem.stamp}
                            volumeName={volume}
                            key={volume}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ListMenuItem;
