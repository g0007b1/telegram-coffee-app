import { type FC } from 'react';

import { type CategoryItemsType } from 'pages/MenuPage/MenuPage.slice';

import ListMenuItem from './components/ListMenuItem';

import styles from './ListCategory.module.scss';

type CategoryPropsType = {
    category: CategoryItemsType;
    name: string;
};

const ListCategory: FC<CategoryPropsType> = ({ category, name }) => {
    console.log(category, name);
    return (
        <div>
            <h3 className={styles.nameContainer}>{name.substring(1)}</h3>
            <div className={styles.listCategoryContainer}>
                {Object.keys(category).map((menuItem) => (
                    <ListMenuItem
                        category={name}
                        key={menuItem}
                        name={menuItem}
                        menuItem={category[menuItem]}
                    />
                ))}
            </div>
        </div>
    );
};

export default ListCategory;
